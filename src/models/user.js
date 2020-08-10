const bcrypt = require('bcrypt-nodejs');

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
				set(password) {
					bcrypt.hash(password, null, null, (err, hash) => {
						if (err) throw new Error(err);
						this.setDataValue('password', hash);
					});
				},
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
	User.prototype.toJSON = function () {
		const value = Object.assign({}, this.get());

		// json으로 반환하는 값에서 중요한 정보 삭제
		// delete password,
		delete value.password;
		delete value.createdAt;
		delete value.updatedAt;

		return value;
	};
	User.prototype.isValidPassword = function (password) {
		return bcrypt.compareSync(password, this.dataValues.password);
	};

	return User;
};
