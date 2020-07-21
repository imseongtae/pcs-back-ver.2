# PCS Back-end
Performance Community Site Back-end 코드 저장소입니다.

## Init Project

## table of contents
1. app 모듈 분리
1. sequelize 설정
1. timezone 설정


## app 모듈 분리
- app 실행 구문을 모듈로 분리
- sequelize를 사용한 db 연결 구문을 모듈로 분리

```js
const hostname = confg.development.host;
syncDb().then(() => {
  console.log('Database 작동 중');
  app.server.listen(process.env.PORT || confg.port, hostname, () => {
    console.log(`Server running at http://${hostname}:${confg.port}/`);
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

## sequelize 설정
- `init sequelize`를 실행 후 config.json의 구문을 사용하기 위해 버전을 낮추니 정상적으로 동작
- 메이저 버전 업데이트로 인해 에러가 발생한 것으로 추정

```json
"sequelize": "^4.41.0",
"sequelize-cli": "^5.2.0"
```

## timezone 설정
- [참조: timezone 적용, 조회시 시간 제대로 표기하기](https://lemontia.tistory.com/873)
- 아래 내용을 config.json에 설정

```js
var seqConfig = { 
  timezone: config.database.timezone, 
  dialectOptions: { 
    charset: 'utf8mb4', 
    dateStrings: true, 
    typeCast: true 
  } ,
  define: { timestamps: true } 
}
```

