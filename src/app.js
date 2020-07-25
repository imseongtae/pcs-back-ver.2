// libs
const express = require('express');
const morgan = require('morgan');

// api
const api = require('./api');
const docs = require('./utils/api-docs');

// setup express
const app = express();
// middleware
if (process.env.NOED_ENV !== 'test') {
	app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// settup routes
app.use('/', api());

// api spec docs
app.use('/api', docs);

module.exports = app;
