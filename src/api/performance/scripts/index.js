const fs = require('fs');
const { Performance, Performance_detail } = require('../../../models');

// KOPIS에 쿼리 스크립트를 통해 조회한 데이터를 정돈하기 위해 사용되는 함수
const tidyData = data => {
	try {
		const [result] = data.map(v => {
			return {
				mt20id: v.mt20id._text,
				prfnm: v.prfnm._text,
				prfpdfrom: v.prfpdfrom._text,
				prfpdto: v.prfpdto._text,
				fcltynm: v.fcltynm._text,
				prfcast: v.prfcast._text,
				prfcrew: v.prfcrew._text,
				prfruntime: v.prfruntime._text,
				prfage: v.prfage._text,
				entrpsnm: v.entrpsnm._text,
				pcseguidance: v.pcseguidance._text,
				poster: v.poster._text,
				sty: v.sty._text,
				genrenm: v.genrenm._text,
				prfstate: v.prfstate._text,
				openrun: v.openrun._text,
				styurls: v.styurls._text,
				mt10id: v.mt10id._text,
				dtguidance: v.dtguidance._text,
			};
		});
		// 데이터를 반환할 때 배열 비구조화 할당
		return result;
	} catch (error) {
		console.log(error);
	}
};

// DB Performance_detail 테이블에 저장할 함수 만들기
const storePerformanceDetailData = async data => {
	try {
		await Promise.all(
			data.map(async v => {
				return await Performance_detail.upsert({
					mt20id: v.mt20id._text,
					prfnm: v.prfnm._text,
					prfpdfrom: v.prfpdfrom._text,
					prfpdto: v.prfpdto._text,
					fcltynm: v.fcltynm._text,
					prfcast: v.prfcast._text,
					prfcrew: v.prfcrew._text,
					prfruntime: v.prfruntime._text,
					prfage: v.prfage._text,
					entrpsnm: v.entrpsnm._text,
					pcseguidance: v.pcseguidance._text,
					poster: v.poster._text,
					sty: v.sty._text,
					genrenm: v.genrenm._text,
					prfstate: v.prfstate._text,
					openrun: v.openrun._text,
					styurls: v.styurls._text,
					mt10id: v.mt10id._text,
					dtguidance: v.dtguidance._text,
				});
			}),
		);
	} catch (error) {
		console.log(error);
	}
};

// test case 및 DB Performances 테이블에 데이터를 반영하기 위한 함수
const getPerformancesDummyData = async () => {
	// fs 모듈 메서드 인자로 절대 경로 전달
	const dummy = fs.readFileSync(
		'./src/api/performance/json/ongoing-performances.json',
	); // 공연중목록 데이터 할당
	const data = JSON.parse(dummy.toString());
	// console.log(data);
	try {
		await Promise.all(
			data.map(async v => {
				return await Performance.upsert({
					mt20id: v.mt20id._text,
					prfnm: v.prfnm._text,
					prfpdfrom: v.prfpdfrom._text,
					prfpdto: v.prfpdto._text,
					fcltynm: v.fcltynm._text,
					poster: v.poster._text,
					genrenm: v.genrenm._text,
					prfstate: v.prfstate._text,
					openrun: v.openrun._text,
				});
			}),
		);
	} catch (error) {
		console.error(error);
	}
};

module.exports = {
	tidyData,
	storePerformanceDetailData,
	getPerformancesDummyData,
};
