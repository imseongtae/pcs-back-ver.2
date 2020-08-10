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
		// console.log('생성된 데이터 user: ', user.nickname);
		res.status(201).json(user);
		// res.status(201).json({ data: user });
	} catch (e) {
		if (e.name === 'SequelizeValidationError') {
			// Unique 컬럼에 대해 값을 입력하지 않을 경우
			return res.status(400).json({ msg: e.errors[0].message });
		} else if (e.name === 'SequelizeUniqueConstraintError') {
			// Unique 컬럼에 대해 중복된 값을 입력하는 경우
			return res.status(409).json({ msg: 'Duplicated email' });
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
		return res.status(401);
	}
};

module.exports = {
	signup,
	signin,
	me,
};
