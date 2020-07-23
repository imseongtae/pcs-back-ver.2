const request = require('supertest');
const should = require('should');
const app = require('../../app');
const { Facility } = require('../../models');

// 시설 목록 정보의 dummy data
const { getDummyData } = require('./scripts')


// index facilities
describe('GET /facilities', () => {
  describe('성공', () => {
    getDummyData();
    it('상태코드 200 응답', done => {
      request(app)
        .get('/facilities')
        .expect(200)
        .end(done)
    })
    it('facilities 객체를 담은 배열 응답', done => {
      request(app)
        .get('/facilities')
        .expect(200)
        .end((err, res) => {
          res.body.data.should.be.instanceOf(Array);
          done();
        })
    })
    it('최대 limit 개수만큼 응답', done => {
      request(app)
        .get('/facilities?limit=3')
        .end((err, res) => {
          res.body.data.should.have.lengthOf(3);
          done();
        });
    });
  });
  describe('실패', () => {
    it('limit이 숫자형이 아니면 상태코드 400 응답', done => {
      getDummyData(); // dummy data
      request(app)
        .get('/facilities?limit=three')
        .expect(400)
        .end(done)
    });
  })
})

// describe('GET /facilities', () => {
//   describe('성공', () => {

//   })
// })

// read facilities
// describe('GET /facilities/:mt10id')
// - mt10id 값에 해당하는 facility 객체를 반환
// - id가 숫자가 아닐경우 상태코드 400 응답
// - mt10id 를 찾을 수 없는 경우 상태코드 404 응답
