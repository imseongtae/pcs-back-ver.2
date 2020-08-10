const request = require('supertest');
const should = require('should');
const app = require('../../app');
const models = require('../../models');

// index post
describe('GET /posts', () => {
  const posts = [
    {
      "title": "첫 번째 게시글입니다.",
      "contents": "hello this post is first post"
    },
    {
      "title": "두 번째 게시글입니다.",
      "contents": "hello this post is second post"
    },
    {
      "title": "세 번째 게시글입니다.",
      "contents": "hello this post is third post"
    },
  ]
  before(() => models.sequelize.sync({ force: true }));
  before(() => models.Post.bulkCreate(posts))
  describe('성공시', () => {
    it('게시글 객체를 담은 배열로 응답 ', done => {
      request(app)
        .get('/posts')
        .expect(200)
        .end((err, res) => {
          res.body.should.be.instanceOf(Array)
          done();
        })      
    });        
  });
})

// read post
describe('GET /posts/:id', () => {
  const posts = [
    {
      "title": "첫 번째 게시글입니다.",
      "contents": "hello this post is first post"
    },
    {
      "title": "두 번째 게시글입니다.",
      "contents": "hello this post is second post"
    },
    {
      "title": "세 번째 게시글입니다.",
      "contents": "hello this post is third post"
    },
  ]
  before(() => models.sequelize.sync({ force: true }));
  before(() => models.Post.bulkCreate(posts))
  describe('Success', () => {
    it('id가 1인 게시글 객체 반환', done => {
      request(app)
        .get('/posts/1')
        .expect(200)
        .end((err, res) => {
          res.body.should.property('id', 1)
          done();
        })      
    });        
  });
  describe('Error', () => {
    it('id가 숫자가 아닐경우 400 응답', done => {
      request(app)
        .get('/posts/abc')
        .expect(400)
        .end(done)
    });
    it('id로 게시글을 찾을 수 없는 경우 404 응답', done => {
      request(app)
        .get('/posts/982')
        .expect(404)
        .end(done)
    });
  })
});

// create post
describe('POST /posts', () => {
  const posts = [
    {
      "title": "첫 번째 게시글입니다.",
      "contents": "hello this post is first post"
    },
    {
      "title": "두 번째 게시글입니다.",
      "contents": "hello this post is second post"
    },
    {
      "title": "세 번째 게시글입니다.",
      "contents": "hello this post is third post"
    },
  ]
  before(() => models.sequelize.sync({ force: true }));
  before(() => models.Post.bulkCreate(posts))
  // post 를 작성하기 위한 로그인
  const auth = {};
  before(signupUser());
  before(loginUser(auth));

  describe('Success', () => {
    const newPost = {
      "title": "네 번째 게시글입니다.",
      "contents": "hello this post is fourth post"
    }
    let body;

    before(done => {
      request(app)
        .post('/posts')
        .auth(auth.token, { type: 'bearer' })
        .send(newPost)
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done();
        })
    })
    it('생성된 게시글 객체를 반환', done => {
      body.should.have.property('id')
      done();
    })
  })
  describe('Error', () => {
    it('title 누락시 400을 반환', done => {
      const noTitlePost = {
        "title": "",
        "contents": "hello this post is fourth post"
      }      
      request(app)
        .post('/posts')
        .auth(auth.token, { type: 'bearer' })
        .send(noTitlePost)
        .expect(400)
        .end(done)
    });
    it('content 누락시 400을 반환', done => {
      const noCotentsPost = {
        "title": "네 번째 게시글입니다.",
        "contents": ""
      }
      request(app)
        .post('/posts')
        .auth(auth.token, { type: 'bearer' })
        .send(noCotentsPost)
        .expect(400)
        .end(done)
    });
  })
})


// DELETE /posts/:id
describe('DELETE /posts/:id', () => {
  const posts = [
    {
      "title": "첫 번째 게시글입니다.",
      "contents": "hello this post is first post"
    },
    {
      "title": "두 번째 게시글입니다.",
      "contents": "hello this post is second post"
    },
    {
      "title": "세 번째 게시글입니다.",
      "contents": "hello this post is third post"
    },
  ]
  before(() => models.sequelize.sync({ force: true }));
  before(() => models.Post.bulkCreate(posts))

  // delete를 작성하기 위한 로그인
  const auth = {};
  before(signupUser());
  before(loginUser(auth));

  describe('Success', () => {
    const newPost = {
      "title": "네 번째 게시글입니다.",
      "contents": "hello this post is fourth post"
    }
    let body;
    // 삭제를 위해 4번째 게시물 생성
    before(done => {
      request(app)
        .post('/posts')
        .auth(auth.token, { type: 'bearer' })
        .send(newPost)
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done();
        })
    })
    it('게시물이 삭제될 경우 204 응답', done => {
      request(app)
        .delete('/posts/4')
        .auth(auth.token, { type: 'bearer' })
        .expect(204)
        .end(done)
    });
  });
  describe('Error', () => {
    it('id가 숫자가 아닐경우 400으로 응답', done => {
      request(app)
        .delete('/posts/three')
        .auth(auth.token, { type: 'bearer' })
        .expect(400)
        .end(done)
    });
    it('id로 게시글을 찾을 수 없는 경우 404 응답', done => {
      request(app)
        .delete('/posts/782')
        .auth(auth.token, { type: 'bearer' })
        .expect(404)
        .end(done)
    });
    it('본인이 작성한 게시글이 아닐 경우 권한으로 인한 거절을 의미하는 403 응답', done => {
      request(app)
        .delete('/posts/3')
        .auth(auth.token, { type: 'bearer' })
        .expect(403)
        .end(done)
    });
  });
});

function signupUser() {
  return done => {
    request(app)
      .post('/auth/signup')
      .send({
        "email": "haemil3@gmail.com",
        "password": "1234",
        "nickname": "ham3"
      })
      .expect(201)
      .end(done)
  }
}

function loginUser(auth) {
  return function(done) {
    request(app)
      .post('/auth/signin')
      .send({
        email: 'haemil3@gmail.com',
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