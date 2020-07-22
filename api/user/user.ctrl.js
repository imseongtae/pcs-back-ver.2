const { User } = require('../../models');

const index = async (req, res) => {
	try {
		req.query.limit = req.query.limit || 10;
		// parseInt는 정수가 아니면 NaN을 반환
		const limit = parseInt(req.query.limit, 10);
		// return 을 해주어야 아래로 진행을 막을 수 있다
		if (Number.isNaN(limit))
			return res.status(400).json({ msg: 'limit 값이 숫자형이 아님' });

		// const users = await User.findAll({ limit });
		const users = await User.findAll({
			attributes: ['email', 'password', 'nickname'],
			limit,
		});
		if (!users) return res.status(404).end();
		// res.status(200).json(users);
		return res.status(200).json({ data: users });
	} catch (error) {
		console.log(error);
		res.status(500).end();
	}
};

const read = async (req, res) => {
	try {
		// if (parseInt(id, 10)) return res.status(400).end();
		const id = parseInt(req.params.id, 10);
		if (Number.isNaN(id))
			return res.status(400).json({ msg: '매개변수가 숫자가 아님' });
		const user = await User.findOne({ where: { id } });
		if (!user) return res.status(404).json({ msg: 'do not find user' });

		res.status(200).json({ data: user });
	} catch (error) {
		console.log(error);
		res.status(500).end();
	}
};

const create = async (req, res) => {
	try {
		const nickname = req.body.nickname;
		if (!nickname) return res.status(400).json({ msg: 'no nickname' });
		const email = req.body.email;
		if (!email) return res.status(400).json({ msg: 'no email' });
		const password = req.body.password;
		if (!password) return res.status(400).json({ msg: 'no password' });
		// 생성할 user data
		const newUser = {
			email,
			password,
			nickname,
		};
		// 중복일 경우 catch에서 처리됨
		const user = await User.create(newUser);
		// console.log('생성된 데이터 user: ', user);
		res.status(201).json({ data: user });
	} catch (error) {
		// 모델에서 Unique로 설정된 컬럼이 있을 경우 반환하는 error
		if (error.name === 'SequelizeUniqueConstraintError') {
			return res.status(409).json({ msg: 'Duplicated email' });
		}
		console.log(error);
		return res.status(500).end();
	}
};

const destroy = async (req, res) => {
	try {
		const id = parseInt(req.params.id, 10);
		if (Number.isNaN(id))
			return res.status(400).json({ msg: '매개변수가 숫자가 아님' });

		await User.destroy({ where: { id } });
		res.status(204).json({ msg: true });
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	index,
	read,
	create,
	destroy,
};
