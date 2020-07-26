const convert = require('xml-js');
const request = require('request');
require('dotenv').config();

// 공연 목록 정보와 공연 상세 정보 Model
const { Performance, Performance_detail } = require('../../models');
// 처음 Performance API에 데이터가 없다면 아래 함수 실행을 통해 데이터를 등록한다.
const {
	getPerformancesDummyData,
	storePerformanceDetailData,
	tidyData,
} = require('./scripts');

// KOPIS에 쿼리스크립트를 요청하기 위해 필요한 URL
const SERVICE_KEY = process.env.SERVICE_KEY;
const HOST = 'http://kopis.or.kr/openApi/restful/';
const category = 'pblprfr/';

// index performance
const index = async (req, res) => {
	try {
		req.query.limit = req.query.limit || 10;
		const limit = parseInt(req.query.limit, 10);
		if (Number.isNaN(limit))
			return res.status(400).json('limit 값이 숫자형이 아님');

		await getPerformancesDummyData(); // 초기 dummy data DB에 반영
		const performances = await Performance.findAll({ limit });
		if (performances.length === 0)
			return res.status(404).json({ msg: 'not found performances' });

		return res.status(200).json({ data: performances });
	} catch (error) {
		console.log(error);
	}
};

// read performance
const read = async (req, res) => {
	try {
		// mt20id는 KOPIS의 공연시설상세 테이블의 ID
		const mt20id = req.params.mt20id;
		const performance = await Performance_detail.findByPk(mt20id);
		if (performance) {
			return res.status(200).json({ data: performance });
		} else {
			// 공연 상세 정보가 DB에 등록되어 있지 않을 때 KOPIS API에 직접 요청
			const requestUrl = `${HOST}${category}${mt20id}?service=${SERVICE_KEY}`;
			request(
				{ url: requestUrl, method: 'GET' },
				async (err, response, body) => {
					if (err) res.status(400).json({ msg: err });
					if (response.statusCode === 200) {
						const xmlToJson = convert.xml2json(body, {
							compact: true,
							spaces: 2,
						});
						// 쿼리 스크립트로 얻은 데이터를 저장 후 응답
						const { db } = JSON.parse(xmlToJson).dbs;
						// console.log('db: ', db);
						if (!db)
							return res.status(404).json({ msg: 'not found performance' });
						// map 사용을 위해 배열 씌워서 보내기
						await storePerformanceDetailData([db]);
						// 데이터 정돈
						const result = await tidyData([db]);
						return res.status(200).json({ data: result });
					} else {
						return res.status(404).json({ msg: 'not found performance' });
					}
				},
			);
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	index,
	read,
};
