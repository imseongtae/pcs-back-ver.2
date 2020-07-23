const express = require('express');
const morgan = require('morgan');

const app = express();
// router module
const api = require('./api');

// middleware
if (process.env.NOED_ENV !== 'test') {
	app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes setting
app.use('/', api());

module.exports = app;
