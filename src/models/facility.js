module.exports = (sequelize, Sequelize) => {
	return sequelize.define(
		'Facility',
		{
			mt10id: {
				type: Sequelize.STRING(20),
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
				type: Sequelize.STRING(20),
				allowNull: false,
			},
			sidonm: {
				type: Sequelize.STRING(20),
				allowNull: false,
			},
			gugunnm: {
				type: Sequelize.STRING(20),
				allowNull: false,
			},
			opende: {
				type: Sequelize.INTEGER,
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
