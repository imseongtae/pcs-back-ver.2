const request = require('supertest');
const should = require('should');
const app = require('../../app');
const models = require('../../models');

const assert = require('assert')

// http://jeonghwan-kim.github.io/dev/2020/05/25/supertest.html
// function hasData(status, callback) { // 1번
//   return (res) => { // 2번
//     assert.equal(res.status, status); // 3번 
//     if (!body.hasOwnProperty('data')) throw new Error("missing data key"); // 4번    
//     callback(res.body.data); // 5번 
//   };
// }

/**
 * 참조
 * http://jeonghwan-kim.github.io/dev/2020/05/25/supertest.html
 * https://shouldjs.github.io/
 */
describe('GET /users', () => {
  before(() => models.sequelize.sync({ force: true }));
  const users = [
    {
      email: 'haemil@gmail.com',
      password: '1234',
      nickname: 'ham',
    },
    {
      email: 'sonaldo@gmail.com',
      password: '1234',
      nickname: 'son',
    },
    {
      email: 'messi@gmail.com',
      password: '1234',
      nickname: 'messi',
    },
  ];
  before(() => models.User.bulkCreate(users))
  describe('성공시', () => {
    it('상태 코드 200을 응답한다.', done => {
      request(app).get('/users').expect(200).end(done)
    })
    it('유저 객체를 담은 배열을 응답한다.', done => {
      request(app)
        .get('/users')
        .end((err, res) => {
          // key: value를 맞추기 위해 body.data로 테스트
          res.body.data.should.be.instanceOf(Array)
          done();
        });
      // .expect(200, {data: users}).end(done)
    });
    it('설정한 limit 개수만큼 응답한다.', done => {
      request(app)
        .get('/users?limit=2')
        .end((err, res) => {
          // console.log('data가 무엇인지:', res) // 아래처럼 날라옴
          //  body: { data: [ [Object], [Object] ] },
          res.body.data.should.have.lengthOf(2);
          done();
        })
    })
  })
  describe('실패시', () => {
    it('limit이 숫자형이 아니면 400을 응답한다.', done => {
      request(app).get('/users?limit=two').expect(400).end(done);
    });
  });
})

describe('GET /users/:id', () => {
  describe('성공시', () => {
    it('id가 1인 user 객체를 반환한다.', done => {
      request(app).get('/users/1')
        .end((err, res) => {
          res.body.data.should.have.property('id', 1)
          done();
        })
    })
  });
  describe('실패시', () => {
    it('라우팅 매개변수 숫자가 아닐 경우 400으로 응답한다.', done => {
      request(app)
        .get('/users/one')
        .expect(400).end(done);
    })
    it('id로 사용자를 찾을 수 없는 경우 404로 응답한다.', done => {
      request(app)
        .get('/users/999')
        .expect(404)
        .end(done)
    })
  });
});

describe('POST /users', () => {
  before(() => models.sequelize.sync({ force: true }));
  const users = [
    {
      email: 'haemil@gmail.com',
      password: '1234',
      nickname: 'ham',
    },
    {
      email: 'sonaldo@gmail.com',
      password: '1234',
      nickname: 'son',
    },
    {
      email: 'messi@gmail.com',
      password: '1234',
      nickname: 'messi',
    },
  ];
  before(() => models.User.bulkCreate(users))

  describe('성공시', () => {
    let body;
    const newUser = {
      "email": "hamburger@naver.com",
      "password": "1234",
      "nickname": "hamburger"
    }; 
    before(done => {
      request(app).post('/users')
        .send(newUser)
        .expect(201)
        .end((err, res) => {
          body = res.body;
          // console.log('body값..: ', body);
          done();
        })
    })    
    it('생성된 사용자 객체를 반환한다.', done => {
      // body값을 조회하면 생성한 데이터가 조회됨
      // console.log('body값..: ', body)     
      body.data.should.have.property('id')
      done();
    });
    it('입력한 nickname을 반환한다.', done => {
      // 아래는 should가 출력하는 메시지
      // operator: 'to have property nickname of \'hamburger\'' } }
      body.data.should.have.property('nickname', newUser.nickname)
      done()
    })
  })
  describe('실패시', () => {
    it('파라미터 누락시 400을 반환한다.', done => {
      const newUser = {
        "email": "",
        "password": "1234",
        "nickname": "hamburger"
      }; 
      request(app).post('/users').send(newUser).expect(400).end(done)
    });
    it('email이 중복일 경우 409를 반환한다.', done => {
      const newUser = {
        "email": "hamburger@naver.com",
        "password": "1234",
        "nickname": "hamburger"
      };
      request(app)
        .post('/users')
        .send(newUser)
        .expect(409)
        .end(done)
    })
  })
})

// describe('POST /users', () => {
//   describe('성공시')
//   describe('실패시')
// })

describe('DELETE /users/:id', () => {
  before(() => models.sequelize.sync({ force: true }));
  const users = [
    {
      email: 'haemil@gmail.com',
      password: '1234',
      nickname: 'ham',
    },
    {
      email: 'sonaldo@gmail.com',
      password: '1234',
      nickname: 'son',
    },
    {
      email: 'messi@gmail.com',
      password: '1234',
      nickname: 'messi',
    },
    {
      email: "hamburger@naver.com",
      password: "1234",
      nickname: "hamburger"
    }
  ];
  before(() => models.User.bulkCreate(users))
  describe('성공시', () => {
    it('사용자를 삭제할 경우 상태코드 204를 응답한다.', done => {
      request(app)
        .delete('/users/4')
        .expect(204)
        .end(done)        
    })
  })
  describe('실패시', () => {
    it('매개변수 id가 숫자가 아닐 경우 400으로 응답한다.', done => {
      request(app)
        .delete('/users/four')
        .expect(400)
        .end(done)
    })
  })
})
