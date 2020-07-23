module.exports = (sequelize, Sequelize) => {
	return sequelize.define(
		'Facility_detail',
		{
			mt10id: {
				type: Sequelize.STRING(30),
				allowNull: false,
				primaryKey: true,
			},
			fcltynm: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			mt13cnt: {
				type: Sequelize.STRING(30),
				allowNull: false,
			},
			fcltychartr: {
				type: Sequelize.STRING(30),
				allowNull: false,
			},
			opende: {
				// test
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			seatscale: {
				type: Sequelize.STRING(30),
				allowNull: false,
			},
			telno: {
				type: Sequelize.STRING(30),
				allowNull: false,
			},
			relateurl: {
				type: Sequelize.STRING(50),
				allowNull: false,
			},
			adres: {
				type: Sequelize.STRING(50),
				allowNull: false,
			},
			la: {
				type: Sequelize.STRING(30),
				allowNull: false,
			},
			lo: {
				type: Sequelize.STRING(30),
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
