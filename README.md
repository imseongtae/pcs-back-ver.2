# PCS Back-end
Performance Community Site Back-end 코드 저장소입니다.


## Init Project

### app 실행 모듈

```js
const syncDb = require('./sync-db');
const app = require('../app');

syncDb().then(() => {
	app.listen(3000, () => {
    console.log('pcs back-end 작동 중');
	});
});
```


```js
const db = require('../models');

module.exports = () => {
  const options = {
    force: process.env.NODE_ENV === 'test' ? true : false,
	};
  return db.sequelize.sync(options);
};
```
