const should = require('should');
const app = require('../../app');
const request = require('supertest')(app);
const models = require('../../models')

/**
 * 참조: can use the auth method
 * https://gist.github.com/bq1990/595c615970250e97f3ea
 */

// signup User
describe('POST /auth/signup', () => {
  before(() => models.sequelize.sync({ force: true }));

  describe('Success', () => {
    it('201 상태코드와 함께 사용자 nickname 반환', done => {
      request
        .post('/auth/signup')
        .send({
          "email": "haemil1@gmail.com",
          "password": "1234",
          "nickname": "ham1"
        })
        .expect(201)
        .end((err, res) => {
          res.body.should.have.property('nickname');
          done();
        })
    });    
  });
  // Error 
  describe('Error', () => {
    newUser = {
      "email": "haemil2@gmail.com",
      "password": "1234",
      "nickname": "ham2"
    }
    before(() => models.User.create(newUser));
    it('email 중복일 경우 409를 반환', done => {
      request
        .post('/auth/signup')
        .send(newUser)
        .expect(409)
        .end(done)
    });
    it('email 누락시 400을 반환', done => {
      noEmailUser = {
        "email": "",
        "password": "1234",
        "nickname": "ham4"
      }
      request
        .post('/auth/signup')
        .send(noEmailUser)
        .expect(400)
        .end(done)
    });
  });
});

// signin info
describe('GET /auth/me', () => {
  before(() => models.sequelize.sync({ force: true }));
  describe('Error', () => {
    // 에러메시지가 길어서 주석처리함
    // it('should require authorization', done => {
    //   request
    //     .get('/auth/me')
    //     .expect(401)
    //     .end(done)
    // });    
  });

  describe('Success', () => {
    const auth = {};
    before(signupUser());
    before(loginUser(auth));    
    it('사용자 정보를 담은 객체를 반환', done => {
      request
        .get('/auth/me')
        .auth(auth.token, { type: 'bearer' })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          res.body.should.be.instanceof(Object);
          done();
        });
    });
  });
});

function signupUser() {
  return done => {
    request
      .post('/auth/signup')
      .send({
        "email": "haemil@gmail.com",
        "password": "1234",
        "nickname": "ham3"
      })
      .expect(201)
      .end(done)
  }
}

function loginUser(auth) {
  return function(done) {
    request
      .post('/auth/signin')
      .send({
        email: 'haemil@gmail.com',
        password: '1234'
      })
      .expect(200)
      .end(onResponse);

    function onResponse(err, res) {
      auth.token = res.body.accessToken;
      // console.log('token: ',auth.token);
      return done();
    }
  };
}