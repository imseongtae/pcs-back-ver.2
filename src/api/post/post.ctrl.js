const { Post, User } = require('../../models');

/**
 * 참조: includeOption 설정 Error
 * https://stackoverflow.com/questions/51909676/sequelize-typeerror-cannot-read-property-expandincludeall-of-undefined
 * 	include: {
			model: User,
		},
		위와 같은 방식으로 옵션을 설정하면 에러
		몇 개의 모델을 포함하냐에 따라 다를 수 있을 것 같음
 */
const includeOption = [
	{ all: true },
	{
		model: User,
	},
];

/**
 * Sequelize 데이터 정렬법
 * https://victorydntmd.tistory.com/92
 */

const index = async (req, res) => {
	try {
		const posts = await Post.findAll({
			include: includeOption,
			order: [['id', 'DESC']],
		});
		res.status(200).json(posts);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

const read = async (req, res) => {
	const id = parseInt(req.params.id, 10);
	if (Number.isNaN(id))
		return res.status(400).json({ msg: '매개변수 값이 숫자형이 아님' });
	try {
		// const post = await Post.findByPk(id);
		const post = await Post.findOne({
			where: { id },
			include: includeOption,
		});
		if (!post)
			return res.status(404).json({ msg: '게시글이 존재하지 않습니다.' });

		res.status(200).json(post);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

const create = async (req, res) => {
	const { title, contents } = req.body;
	if (!title) return res.status(400).json({ msg: 'no title' });
	if (!contents) return res.status(400).json({ msg: 'no contents' });
	try {
		const newPost = await Post.create({ title, contents, UserId: req.user.id });
		// res.status(201).json(post);
		// 게시글과 작성자 정보를 함께 반환
		res.status(201).json({
			id: newPost.id,
			title: newPost.title,
			contents: newPost.contents,
			user: req.user,
		});
	} catch (error) {
		if (error.name === 'SequelizeValidationError') {
			return res.status(400).json({ msg: error.errors[0].message });
		} else {
			return res.status(500).json(error);
		}
	}
};

const update = async (req, res) => {
	const id = parseInt(req.params.id, 10);
	if (Number.isNaN(id))
		return res.status(400).json({ msg: '매개변수 값이 숫자형이 아님' });

	const post = await Post.findByPk(id);
	const user = req.user;
	if (!post) {
		return res.status(404).json({ msg: '존재하지 않는 게시물' });
	} else if (!post.isMyPost(user))
		// 자신의 게시물인지 확인하는 절차 필요함
		return res
			.status(403)
			.json({ msg: '자신의 게시물이 아닌 게시물은 수정할 수 없음' });

	const { title, contents } = req.body;
	if (!title) return res.status(400).json({ msg: 'no title' });
	if (!contents) return res.status(400).json({ msg: 'no contents' });
	try {
		post.title = title;
		post.contents = contents;
		await post.save();

		const updatedPost = await Post.findOne({
			where: { id },
			include: includeOption,
		});

		// res.status(200).json(post);
		res.status(200).json(updatedPost);
	} catch (error) {
		return res.status(500).json(error);
	}
};

const destroy = async (req, res) => {
	const id = parseInt(req.params.id, 10);
	if (Number.isNaN(id))
		return res.status(400).json({ msg: '매개변수 값이 숫자형이 아님' });
	const user = req.user;
	try {
		// 비교
		const post = await Post.findByPk(id);
		if (!post) {
			return res.status(404).json({ msg: 'not found post' });
		} else if (!post.isMyPost(user)) {
			// 403은 서버에 요청이 전달되었지만, 권한 때문에 거절되었다는 것을 의미
			return res
				.status(403)
				.json({ msg: '자신의 게시물이 아닌 게시물은 삭제할 수 없음' });
		}
		await post.destroy();
		res.status(204).json({ msg: 'delete post' });
	} catch (error) {
		return res.status(500).json(error);
	}
};

module.exports = {
	index,
	read,
	create,
	update,
	destroy,
};
