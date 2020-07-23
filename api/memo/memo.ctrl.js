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

// back

module.exports = {
	index,
};
