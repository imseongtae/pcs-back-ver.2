const http = require('http');

const syncDb = require('./sync-db');
const app = require('../app');
const confg = require('../config/config.json');

app.server = http.createServer(app);

const hostname = confg.development.host;
syncDb().then(() => {
	console.log(
		'--------------------------------------------------------------------------------',
	);
	console.log('Database 작동 중');
	app.server.listen(process.env.PORT || confg.port, hostname, () => {
		console.log(
			'--------------------------------------------------------------------------------',
		);
		console.log(`Server running at http://${hostname}:${confg.port}/`);
		console.log(
			'--------------------------------------------------------------------------------',
		);
	});
});
