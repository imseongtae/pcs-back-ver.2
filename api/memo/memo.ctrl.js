const { Memo } = require('../../models');

// index memo
const index = async (req, res) => {
	try {
		// limit 값 세팅
		req.query.limit = req.query.limit || 10;
		// parseInt의 인자로 전달되는 값이 숫자형이 아니라면 NaN 반환
		const limit = parseInt(req.query.limit, 10);
		if (Number.isNaN(limit))
			return res.status(400).json({ msg: 'limit 값이 숫자형이 아님' });

		const memos = await Memo.findAll({ limit });
		res.status(200).json({ data: memos });
	} catch (error) {
		console.log(error);
	}
};

const read = async (req, res) => {
	try {
		const id = parseInt(req.params.id, 10);
		if (Number.isNaN(id))
			return res.status(400).json({ msg: '매개변수 값이 숫자형이 아님' });

		const memo = await Memo.findByPk(id);
		if (!memo) return res.status(404).json({ msg: 'not found memo' });

		res.status(200).json({ data: memo });
	} catch (error) {
		console.log(error);
	}
};

const create = async (req, res) => {
	try {
		const title = req.body.title;
		if (!title) return res.status(400).json({ msg: 'no title' });
		const content = req.body.content;
		if (!content) return res.status(400).json({ msg: 'no content' });

		const newMemo = {
			title,
			content,
		};
		const memo = await Memo.create(newMemo);
		res.status(201).json({ data: memo });
	} catch (error) {
		console.log(error);
	}
};

const destroy = async (req, res) => {
	try {
		const id = parseInt(req.params.id, 10);
		if (Number.isNaN(id))
			return res.status(400).json({ msg: '매개변수 값이 숫자형이 아님' });

		const memo = await Memo.findByPk(id);
		if (!memo) return res.status(404).json({ msg: 'not found memo' });

		await memo.destroy();
		res.status(204).json({ result: true });
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
