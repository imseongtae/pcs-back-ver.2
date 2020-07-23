const request = require('supertest');
const should = require('should');
const app = require('../../app');
const models = require('../../models');

/**
 * 참조
 * http://jeonghwan-kim.github.io/dev/2020/05/25/supertest.html
 * https://shouldjs.github.io/
 */

// index memos
describe('GET /memos', () => {
  const memos = [
    {
      "title": "첫 번째 메모입니다.",
      "content": "hello this memo is first memo"
    },
    {
      "title": "두 번째 메모입니다.",
      "content": "hello this memo is second memo"
    },
    {
      "title": "세 번째 메모입니다.",
      "content": "hello this memo is third memo"
    },
  ]
  before(() => models.sequelize.sync({ force: true }));
  before(() => models.Memo.bulkCreate(memos))
  describe('성공시', () => {
    it('메모 객체를 담은 배열로 응답 ', done => {
      request(app)
        .get('/memos')
        .expect(200)
        .end((err, res) => {
          res.body.data.should.be.instanceOf(Array)
          done();
        })      
    });
    it('최대 limit 개수만큼 응답', done => {
      request(app)
        .get('/memos?limit=3')
        .expect(200)
        .end((err, res) => {
          res.body.data.should.have.lengthOf(3)
          done();
        })
    });      
  });
  describe('실패시', () => {
    it('limit이 숫자형이 아니면 400을 응답', done => {
      request(app)
        .get('/memos?limit=three')
        .expect(400)
        .end(done)
    });
  });
})

// read memo
describe('GET /memos/:id', () => {
  const memos = [
    {
      "title": "첫 번째 메모입니다.",
      "content": "hello this memo is first memo"
    },
    {
      "title": "두 번째 메모입니다.",
      "content": "hello this memo is second memo"
    },
    {
      "title": "세 번째 메모입니다.",
      "content": "hello this memo is third memo"
    },
  ]
  before(() => models.sequelize.sync({ force: true }));
  before(() => models.Memo.bulkCreate(memos))
  describe('성공시', () => {
    it('id가 1인 메모 객체를 반환', done => {
      request(app)
        .get('/memos/1')
        .expect(200)
        .end((err, res) => {
          res.body.data.should.have.property('id', 1)
          done();
        })      
    });
  });
  describe('실패시', () => {
    it('id가 숫자가 아닐경우 400으로 응답', done => {
      request(app)
        .get('/memos/one')
        .expect(400)
        .end(done)
    })
    it('id로 메모를 찾을 수 없는 경우 404로 응답', done => {
      request(app)
        .get('/memos/987')
        .expect(404)
        .end(done)
    })
  });
})

// create memo
describe('POST /memos', () => {
  const memos = [
    {
      "title": "첫 번째 메모입니다.",
      "content": "hello this memo is first memo"
    },
    {
      "title": "두 번째 메모입니다.",
      "content": "hello this memo is second memo"
    },
    {
      "title": "세 번째 메모입니다.",
      "content": "hello this memo is third memo"
    },
  ]
  before(() => models.sequelize.sync({ force: true }));
  before(() => models.Memo.bulkCreate(memos))

  describe('성공시', () => {
    let body;
    const newMemo = {
      "title": "네 번째 메모입니다.",
      "content": "hello this memo is fourth memo"
    };
    before(done => {
      request(app).post('/memos')
        .send(newMemo)
        .expect(201)
        .end((err, res) => {
          body = res.body;
          // console.log('body값..: ', body);
          done();
        })
    })    
    it('생성된 메모 객체를 반환', done => {
      // body값을 조회하면 생성한 데이터가 조회됨        
      body.data.should.have.property('id')
      done();
    });
    it('입력한 title을 반환', done => {
      body.data.should.have.property('title', newMemo.title);
      done();
    });
    it('입력한 content를 반환', done => {
      body.data.should.have.property('content', newMemo.content);
      done();
    })
  })
  describe('실패시', () => {
    it('title 누락시 400을 반환', done => {
      const newMemo = {
        "title": "",
        "content": "hello this memo is fifth memo"
      };
      request(app).post('/memos').send(newMemo)
        .expect(400)
        .end(done)
    });
    it('content 누락시 400을 반환', done => {
      const newMemo = {
        "title": "다섯 번째 메모입니다.",
        "content": ""
      };
      request(app).post('/memos').send(newMemo)
        .expect(400)
        .end(done)
    });
  })
})


// delete memo
describe('DELETE /memos/:id', () => {
  const memos = [
    {
      "title": "첫 번째 메모입니다.",
      "content": "hello this memo is first memo"
    },
    {
      "title": "두 번째 메모입니다.",
      "content": "hello this memo is second memo"
    },
    {
      "title": "세 번째 메모입니다.",
      "content": "hello this memo is third memo"
    },
  ]
  before(() => models.sequelize.sync({ force: true }));
  before(() => models.Memo.bulkCreate(memos))
  describe('성공시', () => {
    it('204를 응답', done => {
      request(app)
        .delete('/memos/1')
        .expect(204)
        .end(done)
    });
  });
  describe('실패시', () => {
    it('id가 숫자가 아닐경우 400으로 응답', done => {
      request(app)
        .delete('/memos/one')
        .expect(400)
        .end(done)
    })
    it('id로 메모를 찾을수 없을 경우 404로 응답', done => {
      request(app)
        .delete('/memos/987')
        .expect(404)
        .end(done)
    })
  });
})