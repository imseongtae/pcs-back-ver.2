const http = require('http');
const chalk = require('chalk');

const syncDb = require('./sync-db');
const app = require('../app');
const confg = require('../config/config.json');

app.server = http.createServer(app);

const hostname = confg.development.host;
syncDb().then(() => {
	console.log(
		`${chalk
			.hex('#8BC500')
			.bold('=============================================')}`,
	);
	console.log(`${chalk.white.bgHex('00546B').bold(`MySQL Database running`)}`);
	app.server.listen(process.env.PORT || confg.port, hostname, () => {
		console.log(
			`${chalk.white
				.bgHex('#8BC500')
				.bold(`pcs Server running at http://${hostname}:${confg.port}/`)}`,
		);
		console.log(
			`${chalk
				.hex('#8BC500')
				.bold('=============================================')}`,
		);
	});
});
