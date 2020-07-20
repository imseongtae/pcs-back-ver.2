module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			email: {
				type: DataTypes.STRING(40),
				allowNull: false, // 필수
				unique: true, // 중복 금지
			},
			password: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			nickname: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci', // 한글 저장을 위해
		},
	);
	return User;
};
