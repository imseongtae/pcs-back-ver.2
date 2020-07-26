const fs = require('fs');
const { Facility, Facility_detail } = require('../../../models');

// KOPIS에 쿼리 스크립트를 통해 조회한 데이터를 정돈하기 위해 사용되는 함수
const tidyData = data => {
	try {
		const [result] = data.map(v => {
			return {
				mt10id: v.mt10id._text,
				fcltynm: v.fcltynm._text,
				mt13cnt: v.mt13cnt._text,
				fcltychartr: v.fcltychartr._text,
				opende: v.opende._text,
				seatscale: v.seatscale._text,
				telno: v.telno._text,
				relateurl: v.relateurl._text,
				adres: v.adres._text,
				la: v.la._text,
				lo: v.lo._text,
			};
		});
		return result;
	} catch (error) {
		console.log(error);
	}
};

// DB에 저장
const storeFacilityData = async data => {
	try {
		await Promise.all(
			data.map(async v => {
				return await Facility_detail.upsert({
					mt10id: v.mt10id._text,
					fcltynm: v.fcltynm._text,
					mt13cnt: v.mt13cnt._text,
					fcltychartr: v.fcltychartr._text,
					opende: v.opende._text,
					seatscale: v.seatscale._text,
					telno: v.telno._text,
					relateurl: v.relateurl._text,
					adres: v.adres._text,
					la: v.la._text,
					lo: v.lo._text,
				});
			}),
		);
	} catch (error) {
		console.log(error);
	}
};

const getFacilitiesDummyData = async () => {
	// test case 를 위한 dummy data
	// fs 모듈 메서드 인자로 절대 경로 전달
	const dummy = fs.readFileSync('./src/api/facility/json/facility_dummy.json'); // 공연중목록을 쌓을 거임
	const data = JSON.parse(dummy.toString());
	// console.log(data);
	try {
		await Promise.all(
			data.map(async v => {
				return await Facility.upsert({
					mt10id: v.mt10id._text,
					fcltynm: v.fcltynm._text,
					mt13cnt: v.mt13cnt._text,
					fcltychartr: v.fcltychartr._text,
					sidonm: v.sidonm._text,
					gugunnm: v.gugunnm._text,
					opende: v.opende._text,
				});
			}),
		);
	} catch (error) {
		console.error(error);
	}
};

// const getDummyDataForDetail = async () => {};

module.exports = {
	tidyData,
	storeFacilityData,
	getFacilitiesDummyData,
};
