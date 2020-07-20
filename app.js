const express = require('express');
const morgan = require('morgan');

const app = express();

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.status(200).send('hello world');
	res.end();
});

module.exports = app;
