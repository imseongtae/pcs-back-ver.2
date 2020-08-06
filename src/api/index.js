const { Router } = require('express');

// passport
const passportLib = require('../libs/passport');

// API
const UserAPI = require('./user');
const AuthAPI = require('./auth');
const MemoAPI = require('./memo');
const PostAPI = require('./post');
const FacilityAPI = require('./facility');
const PerformanceAPI = require('./performance');

module.exports = () => {
	// passport init() 메서드를 통해 로그인 가능
	passportLib.init();

	const API = Router();

	// routes setting
	API.use('/users', UserAPI);
	API.use('/auth', AuthAPI);
	API.use('/memos', MemoAPI);
	API.use('/posts', PostAPI);
	API.use('/facilities', FacilityAPI);
	API.use('/performances', PerformanceAPI);

	API.get('/', (req, res) => {
		res.status(200).send({ result: 'hello world' });
	});

	return API;
};
