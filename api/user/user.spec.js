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

// function hasData(status, callback) { // 1번
//   return (res) => { // 2번
//     assert.equal(res.status, status); // 3번 
//     if (!body.hasOwnProperty('data')) throw new Error("missing data key"); // 4번    
//     callback(res.data); // 5번 
//   };
// }

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

