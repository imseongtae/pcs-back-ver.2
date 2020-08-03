const jwt = require('jsonwebtoken');
const compose = require('composable-middleware');

const secret = 'hot-place-api-token-secret';
// const expiresIn = '7 days'; // minutes
const expiresIn = '1 days';
const { User } = require('../models');

// const expressJwt = require('express-jwt');

const generateToken = ({ id, email, nickname }) => {
	return jwt.sign({ id, email, nickname }, secret, { expiresIn });
};

/**
 * expressJwt는 알고리즘을 필수적으로 적용하도록 업데이트됨
 * 이를 피하려면 다운그레이드 express-jwt": "^5.3.1"
 * https://stackoverflow.com/questions/62665636/if-options-algorithms-throw-new-erroralgorithms-should-be-set-error-alg
 */

function isAuthenticated() {
	// const validate = expressJwt({ secret, algorithms: ['HS256'] });
	const validate = require('express-jwt')({ secret });
	return (
		compose()
			// Validate jwt
			.use(function (req, res, next) {
				try {
					validate(req, res, next);
				} catch (e) {
					console.error(e);
				}
			})
			.use(async function (req, res, next) {
				// Attach user to request
				try {
					const user = await User.findByPk(req.user.id);
					req.user = user;
					next();
				} catch (e) {
					next(e);
				}
			})
	);
}

module.exports = {
	generateToken,
	isAuthenticated,
};
