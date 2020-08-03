// libs
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// api
const api = require('./api');
const docs = require('./utils/api-docs');

// setup express
const app = express();
// middleware
if (process.env.NOED_ENV !== 'test') {
	app.use(morgan('dev'));
}
// 특정 URL만 허용하고 싶을 때
const corsOptions = {
	origin: 'http://localhost:8080',
	credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// setup routes
app.use('/', api());

// api spec docs
app.use('/api', docs);

module.exports = app;
