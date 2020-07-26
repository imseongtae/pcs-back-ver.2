module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'Facility',
		{
			mt10id: {
				type: DataTypes.STRING(20),
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
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			sidonm: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			gugunnm: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			opende: {
				type: DataTypes.INTEGER,
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
