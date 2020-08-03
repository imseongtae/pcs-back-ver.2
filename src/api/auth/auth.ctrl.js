const passport = require('passport');

const { User } = require('../../models');
const { generateToken } = require('../../libs/jwt');

const signup = async (req, res) => {
	const { email, password, nickname } = req.body;
	if (!email) return res.status(400).json({ msg: 'no email' });
	if (!nickname) return res.status(400).json({ msg: 'no nickname' });
	if (!password) return res.status(400).json({ msg: 'no password' });
	try {
		const newUser = {
			email,
			password,
			nickname,
		};
		// 중복일 경우 catch에서 처리됨
		const user = await User.create(newUser);
		// console.log('생성된 데이터 user: ', user);
		console.log('생성된 데이터 user: ', user.nickname);
		res.status(201).json({ nickname: user.nickname });
		// res.status(201).json({ data: user });
	} catch (e) {
		// 모델에서 Unique로 설정된 컬럼이 있을 경우 반환하는 error
		const isSequelizeValidateError =
			e.name === 'SequelizeValidationError' ||
			e.name === 'SequelizeUniqueConstraintError';
		if (isSequelizeValidateError) {
			return res.status(400).json({ msg: e.errors[0].message });
		} else {
			console.error(e);
			return res.status(500).json(e);
		}
	}
};

const signin = (req, res, next) => {
	const { email, password } = req.body;
	if (!email) return res.status(400).json({ msg: 'no email' });
	if (!password) return res.status(400).json({ msg: 'no password' });

	try {
		// passport
		passport.authenticate('local', (err, user, info) => {
			const error = err || info;
			if (error) {
				return res.status(400).json({ msg: error.message });
			}
			const accessToken = generateToken({
				id: user.id,
				email: user.email,
				nickname: user.nickname,
			});
			//
			return res.status(200).json({ accessToken });
		})(req, res, next);
	} catch (error) {
		console.log(error);
		return res.status(500).json({});
	}
};

const me = async (req, res) => {
	try {
		return res.status(200).json(req.user);
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	signup,
	signin,
	me,
};
