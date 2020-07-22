const { User } = require('../../models');

const index = async (req, res) => {
	try {
		req.query.limit = req.query.limit || 10;
		// parseInt는 정수가 아니면 NaN을 반환
		const limit = parseInt(req.query.limit, 10);
		// return 을 해주어야 아래로 진행을 막을 수 있다
		if (Number.isNaN(limit)) return res.status(400).end();

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

const create = async (req, res) => {
	const nickname = req.body.nickname;
	if (!nickname) return res.status(400).end();

	const email = req.body.email;
	const password = req.body.password;

	try {
		const newUser = {
			email,
			password,
			nickname,
		};
		console.log('데이터 생성을 위한 newUser: ', newUser);
		const user = await User.create(newUser);
		console.log('생성된 데이터 user: ', user);
		res.status(201).json(user);
	} catch (error) {
		console.log(error);
		return res.status(500).end();
	}
};

module.exports = {
	index,
	create,
};
