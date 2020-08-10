module.exports = (sequelize, DataTypes) => {
	const Post = sequelize.define(
		'Post',
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				validata: {
					len: {
						args: [1, 255],
						msg: '게시물의 제목은 최소 1자 이상 최대 255자 이하여야 합니다.',
					},
				},
			},
			contents: {
				type: DataTypes.STRING,
				allowNull: false,
				validata: {
					len: {
						args: [1, 500],
						msg: '게시물의 내용은 최소 1자 이상 최대 500자 이하여야 합니다.',
					},
				},
			},
		},
		{
			timestamps: true,
			charset: 'utf8',
			collate: 'utf8_general_ci', // 한글 저장을 위해
		},
	);
	Post.associate = function (models) {
		Post.belongsTo(models.User);
	};
	Post.prototype.toJSON = function () {
		const value = Object.assign({}, this.get());
		// 반환하는 객체 lowercase
		value.user = value.User;

		delete value.User;
		delete value.UserId;
		return value;
	};
	Post.prototype.isMyPost = function (user) {
		const value = Object.assign({}, this.get());
		return user.id === value.UserId;
	};
	return Post;
};
