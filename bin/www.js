const syncDb = require('./sync-db');
const app = require('../app');

syncDb().then(() => {
	console.log('database 작동 중');
	app.listen(3000, () => {
		console.log('pcs back-end 작동 중');
	});
});
