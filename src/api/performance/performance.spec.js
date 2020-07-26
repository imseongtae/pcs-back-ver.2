const request = require('supertest');
const should = require('should');
const app = require('../../app');

const models = require('../../models');
const { Performance } = require('../../models');

// 공연 목록 정보의 dummy data
const { getPerformancesDummyData } = require('./scripts');


/**
 * Unhandled rejection SequelizeUniqueConstraintError: Validation error
 * https://stackoverflow.com/questions/40709409/unhandled-rejection-sequelizeuniqueconstrainterror-validation-error
 */


// index performances
describe('GET /performances', () => {
  before(() => models.sequelize.sync({ force: true }));
  before(() => getPerformancesDummyData())
  describe('성공', () => {
    it('상태코드 200 응답', done => {      
      request(app)
        .get('/performances')
        .expect(200)
        .end(done)
    })
    it('performances 객체를 담은 배열 응답', done => {
      request(app)
        .get('/performances')
        .expect(200)
        .end((err, res) => {
          res.body.data.should.be.instanceOf(Array);
          done();
        })
    })
    it('최대 limit 개수만큼 응답', done => {
      request(app)
        .get('/performances?limit=2')
        .end((err, res) => {
          res.body.data.should.have.lengthOf(2);
          done();
        });
    });
  });
  describe('실패', () => {
    it('limit이 숫자형이 아니면 상태코드 400 응답', done => {           
      request(app)
        .get('/performances?limit=three')
        .expect(400)
        .end(done)
    });
  });
});



// read performances
describe('GET /performances/:mt20id', () => {
  describe('성공', () => {
    const rooftopCat = {
      mt20id: 'PF121682',
      prfnm: '옥탑방 고양이 [대학로]',
      prfcast: '김정문, 김석주, 강병준, 유은, 김다정, 이유진, 김미리내 등',
      mt10id: 'FC000806',
    }
    it('mt20id 값에 해당하는 performance 객체를 반환', done => {
      request(app)
        .get('/performances/PF121682') // 공연명: 옥탑방 고양이 [대학로]
        .expect(200)
        .end((err, res) => {
          // res.body.data 배열로 한 번 감싸져 있어서 scripts/index.js 의 tidyData 함수에서 배열 비구조화
          // KOPIS에서 조회할 때 배열로 리턴됨
          res.body.data.should.have.property('mt20id', rooftopCat.mt20id);
          done();
        });
    });
  });
  describe('실패', () => {
    it('mt20id 에 해당하는 값을 찾을 수 없는 경우 상태코드 404 응답', done => {
      request(app)
        .get('/performances/PF121688')
        .expect(404)
        .end(done)
    })
  })
})

