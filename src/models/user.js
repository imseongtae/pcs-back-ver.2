function isGoogleDomain(domain) {
	const googleDomain = '@gmail.com';

	if (googleDomain === domain) {
		return true;
	} else {
		return false;
	}
}

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			email: {
				type: DataTypes.STRING(40),
				allowNull: false,
				unique: true,
				validata: {
					isGmail(inputtedEmail) {
						const inputtedEmailDomain = inputtedEmail.slice(-10).toLowerCase();
						if (!isGoogleDomain(inputtedEmailDomain)) {
							throw new Error('이메일 형식이 맞지 않습니다.');
						}
					},
				},
			},
			password: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			nickname: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			isAdmin: {
				defaultValue: false,
				type: DataTypes.BOOLEAN,
			},
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci', // 한글 저장을 위해
		},
	);
	return User;
};
