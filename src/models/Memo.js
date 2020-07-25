module.exports = (sequelize, DataTypes) => {
	const Memo = sequelize.define(
		'Memo',
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			content: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			timestamps: true,
			charset: 'utf8',
			collate: 'utf8_general_ci', // 한글 저장을 위해
		},
	);
	return Memo;
};
