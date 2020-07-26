module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'Performance_detail',
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
			prfcast: {
				type: DataTypes.STRING(200),
				allowNull: false,
			},
			prfcrew: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			prfruntime: {
				type: DataTypes.STRING(30),
				allowNull: true,
			},
			prfage: {
				type: DataTypes.STRING(30),
				allowNull: true,
			},
			entrpsnm: {
				type: DataTypes.STRING(30),
				allowNull: true,
			},
			pcseguidance: {
				type: DataTypes.STRING(30),
				allowNull: true,
			},
			poster: {
				type: DataTypes.STRING(200),
				allowNull: true,
			},
			sty: {
				type: DataTypes.STRING(30),
				allowNull: true,
			},
			genrenm: {
				type: DataTypes.STRING(30),
				allowNull: true,
			},
			prfstate: {
				type: DataTypes.STRING(30),
				allowNull: true,
			},
			openrun: {
				type: DataTypes.STRING(10),
				allowNull: true,
			},
			styurls: {
				type: DataTypes.STRING(200),
				allowNull: true,
			},
			mt10id: {
				type: DataTypes.STRING(30),
				allowNull: true,
			},
			dtguidance: {
				type: DataTypes.STRING(500),
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



*/
