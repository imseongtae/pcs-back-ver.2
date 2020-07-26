const request = require('supertest');
const should = require('should');
const app = require('../../app');

const models = require('../../models');
const { Facility, Facility_detail } = require('../../models');

// 시설 목록 정보의 dummy data
const { getFacilitiesDummyData } = require('./scripts');


/**
 * Unhandled rejection SequelizeUniqueConstraintError: Validation error
 * https://stackoverflow.com/questions/40709409/unhandled-rejection-sequelizeuniqueconstrainterror-validation-error
 */


// index facilities
describe('GET /facilities', () => {
  before(() => models.sequelize.sync({ force: true }));
  before(() => getFacilitiesDummyData())
  describe('성공', () => {
    it('상태코드 200 응답', done => {
      before(() => getFacilitiesDummyData());
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
        .get('/facilities?limit=2')
        .end((err, res) => {
          res.body.data.should.have.lengthOf(2);
          done();
        });
    });
  });
  describe('실패', () => {
    it('limit이 숫자형이 아니면 상태코드 400 응답', done => {           
      request(app)
        .get('/facilities?limit=three')
        .expect(400)
        .end(done)
    });
  });
});


// read facilities
describe('GET /facilities/:mt10id', () => {
  const SeoulArtsCenter = { 
    "mt10id": "FC000001",
    "fcltynm": "예술의전당",
    "mt13cnt": "7",
    "fcltychartr": "국립",
    "opende": "1988",
    "seatscale": "164246",
    "telno": "02-580-1300",
    "relateurl": "http://www.sac.or.kr",
    "adres": "서울특별시 서초구 남부순환로 2406 (서초동) ",
    "la": "37.4786896",
    "lo": "127.01182410000001"
  }
  // before는 done을 자동으로 실행
  before(() => models.sequelize.sync({ force: true }));
  // 아래 처럼 데이터를 삽입하고 시작하면..! 데이터가 무결하다고 가정하게 됨
  // 테스트 케이스를 빗나간... 사례
  // before(() => models.Facility_detail.create(SeoulArtsCenter))
  describe('성공', () => {
    it('mt10id 값에 해당하는 facility 객체를 반환', done => {
      request(app)
        .get('/facilities/FC000001')
        .expect(200)
        .end((err, res) => {          
          res.body.data.should.have.property('mt10id', SeoulArtsCenter.mt10id)
          done();
        });
    });
  });
  describe('실패', () => {
    it('mt10id 에 해당하는 값을 찾을 수 없는 경우 상태코드 404 응답', done => {
      request(app)
        .get('/facilities/FC000029')
        .expect(404)
        .end(done);
    });
  });
})

// describe('GET /facilities/:mt10id')

