const { Router } = require('express');

const UserAPI = require('./user');
const MemoAPI = require('./memo');
const FacilityAPI = require('./facility');
const PerformanceAPI = require('./performance');

module.exports = () => {
	const API = Router();

	// routes setting
	API.use('/users', UserAPI);
	API.use('/memos', MemoAPI);
	API.use('/facilities', FacilityAPI);
	API.use('/performances', PerformanceAPI);

	API.get('/', (req, res) => {
		res.status(200).send({ result: 'hello world' });
	});

	return API;
};
