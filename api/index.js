const { Router } = require('express');
const { version } = require('../package.json');

// const UserView = require('./user');

module.exports = () => {
	const API = Router();

	API.get('/', (req, res) => {
		res.status(200).send({ result: 'hello world' });
		res.end();
	});

	API.get('/api', (req, res) => {
		res.status(200).json({ version });
	});

	return API;
};
