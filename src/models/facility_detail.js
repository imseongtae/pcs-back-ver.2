module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'Facility_detail',
		{
			mt10id: {
				type: DataTypes.STRING(30),
				allowNull: false,
				primaryKey: true,
			},
			fcltynm: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			mt13cnt: {
				type: DataTypes.STRING(30),
				allowNull: false,
			},
			fcltychartr: {
				type: DataTypes.STRING(30),
				allowNull: false,
			},
			opende: {
				// test
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			seatscale: {
				type: DataTypes.STRING(30),
				allowNull: false,
			},
			telno: {
				type: DataTypes.STRING(30),
				allowNull: false,
			},
			relateurl: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			adres: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			la: {
				type: DataTypes.STRING(30),
				allowNull: false,
			},
			lo: {
				type: DataTypes.STRING(30),
				allowNull: false,
			},
		},
		{
			timestamps: false,
			charset: 'utf8',
			collate: 'utf8_general_ci',
		},
	);
};
