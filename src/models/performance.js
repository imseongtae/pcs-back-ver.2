module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'Performance',
		{
			mt20id: {
				type: DataTypes.STRING(20),
				allowNull: false,
				primaryKey: true,
			},
			prfnm: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			prfpdfrom: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			prfpdto: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			fcltynm: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			poster: {
				type: DataTypes.STRING(200),
				allowNull: false,
			},
			genrenm: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			prfstate: {
				type: DataTypes.STRING(10),
				allowNull: false,
			},
			openrun: {
				type: DataTypes.STRING(10),
				allowNull: true,
			},
		},
		{
			timestamps: false,
			charset: 'utf8',
			collate: 'utf8_general_ci',
		},
	);
};

/*
mt20id 	공연ID 	PF132236
prfnm 	공연명 	우리연애할까
prfpdfrom 	공연시작일 	2016.05.12
prfpdto 	공연종료일 	2016.07.31
fcltynm 	공연시설명(공연장명) 	피가로아트홀(구 훈아트홀)
poster 	포스터이미지경로 	http://www.kopis.or.kr/upload/pfmPoster/PF_PF132236_160704_142630.gif
genrenm 	공연 장르명 	연극
prfstate 	공연상태 	공연중
openrun 	오픈런 	Y
*/
