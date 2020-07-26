const convert = require('xml-js');
const request = require('request');
require('dotenv').config();

// 시설 목록 정보와 시설 상세 정보 Model
const { Facility, Facility_detail } = require('../../models');
const { storeFacilityData, tidyData } = require('./scripts');
// 처음 faciliy API에 데이터가 없다면 아래 함수 실행을 통해 더미 데이터를 등록한다.
// const { getFacilitiesDummyData } = require('./scripts');

// KOPIS에 쿼리스크립트를 요청하기 위해 필요한 URL
const SERVICE_KEY = process.env.SERVICE_KEY;
const HOST = 'http://kopis.or.kr/openApi/restful/';
const category = 'prfplc/';

const index = async (req, res) => {
	try {
		req.query.limit = req.query.limit || 10;
		const limit = parseInt(req.query.limit, 10);
		if (Number.isNaN(limit))
			return res.status(400).json('limit 값이 숫자형이 아님');

		// await getFacilitiesDummyData(); // 초기 dummy data DB에 반영
		const facilities = await Facility.findAll({ limit });
		if (facilities.length === 0)
			return res.status(404).json({ msg: 'not found facilities' });

		return res.status(200).json({ data: facilities });
	} catch (error) {
		console.log(error);
	}
};

// 쿼리 스크립트
const read = async (req, res) => {
	try {
		// mt10id는 KOPIS의 공연시설상세 테이블의 ID
		const mt10id = req.params.mt10id;
		// 목록 정보 대신 상세 정보 조회를 위해 쿼리 스크립트 작성
		const facility = await Facility_detail.findByPk(mt10id);
		if (facility) {
			return res.status(200).json({ data: facility });
		} else {
			// 공연 시설 정보가 DB에 등록되어 있지 않을 때 KOPIS API에 직접 요청
			const requestUrl = `${HOST}${category}${mt10id}?service=${SERVICE_KEY}`;
			request({ url: requestUrl, method: 'GET' }, (err, response, body) => {
				if (err) res.status(400).json({ msg: err });
				if (response.statusCode === 200) {
					const xmlToJson = convert.xml2json(body, {
						compact: true,
						spaces: 2,
					});
					// 쿼리 스크립트로 얻은 데이터를 저장 후 응답
					const { db } = JSON.parse(xmlToJson).dbs;
					// console.log('db: ', db);
					if (!db) return res.status(404).json({ msg: 'not found facility' });
					// 배열 씌워서 보내기
					storeFacilityData([db]);
					// 데이터 정돈
					const result = tidyData([db]);
					return res.status(200).json({ data: result });
				} else {
					return res.status(404).json({ msg: 'not found facility' });
				}
			});
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	index,
	read,
};
