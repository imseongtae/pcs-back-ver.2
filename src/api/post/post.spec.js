const request = require('supertest');
const should = require('should');
const app = require('../../app');
const models = require('../../models');


// index post
describe('GET /posts', () => {
  // 데이터 초기화
  before(() => models.sequelize.sync({ force: true }));
  // 초기화
  insertDummyPosts(app);
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
  before(() => models.sequelize.sync({ force: true }));
  // before(() => models.Post.bulkCreate(posts))
  // 데이터를 생성하는 코드 작성
  insertDummyPosts(app);
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
  // DB 초기화
  before(() => models.sequelize.sync({ force: true }));
  // before(() => models.Post.bulkCreate(posts))
  // post 를 작성하기 위한 로그인
  const auth = {};  
  before(signupUser({
    "email": "broccoli@gmail.com",
    "password": "1234",
    "nickname": "broccoli"
  }));
  before(loginUser(auth, {
    "email": "broccoli@gmail.com",
    "password": "1234",
  }));
  

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
  before(() => models.sequelize.sync({ force: true }));
  // before(() => models.Post.bulkCreate(posts))
  insertDummyPosts(app);

  // 게시글을 삭제하기 위해 아이디 생성 후 로그인
  const auth = {};
  before(signupUser({
    "email": "chicken@gmail.com",
    "password": "1234",
    "nickname": "chicken"
  }));
  before(loginUser(auth, {
    "email": "chicken@gmail.com",
    "password": "1234",
  }));
  describe('Success', () => {
    const newPost = {
      "title": "네 번째 게시글입니다.",
      "contents": "hello this post is fourth post"
    }
    let body;
    // 삭제를 위한 4번째 게시물 생성
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


// Signup Info
// {
//   "email": "haemil@gmail.com",
//   "password": "1234",
//   "nickname": "ham"
// }
function signupUser(signupInfo) {
  return done => {
    request(app)
      .post('/auth/signup')
      .send(signupInfo)
      .expect(201)
      .end(done)
  }
}


// Login Info
// {
//   email: 'haemil@gmail.com',
//   password: '1234'
// }
function loginUser(auth, loginInfo) {
  return function(done) {
    request(app)
      .post('/auth/signin')
      .send(loginInfo)
      .expect(200)
      .end(onResponse);

    function onResponse(err, res) {
      auth.token = res.body.accessToken;
      // console.log('token: ',auth.token);
      return done();
    }
  };
}


/**
 * 게시글 목록 정보를 표현하기 위해 초기 데이터를 DB에 저장하는 코드
 * 
 */
function insertDummyPosts(app) {
  // 목록 정보로 표현할 글을 생성하기 위한 회원가입과 로그인
  const auth = {};
  // Signup Info
  const signupInfo = {
    "email": "haemil@gmail.com",
    "password": "1234",
    "nickname": "ham"
  }
  // Login Info
  const loginInfo = {
    email: 'haemil@gmail.com',
    password: '1234'
  }
  before(signupUser(signupInfo));
  before(loginUser(auth, loginInfo));
  let body;
  // 작성할 게시글 데이터
  const postList = [
    {
      "title": "첫 번째 게시글입니다.",
      "contents": "hello this post is first post",
    },
    {
      "title": "두 번째 게시글입니다.",
      "contents": "hello this post is second post",
    },
    {
      "title": "세 번째 게시글입니다.",
      "contents": "hello this post is third post",
    },
  ]
  postList.forEach(post => {
    before(done => {
      request(app)
        .post('/posts')
        .auth(auth.token, { type: 'bearer' })
        .send(post)
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done();
        })
    })
  })
  
  // 작성할 게시글 데이터
  // const firstPost = {
  //   "title": "첫 번째 게시글입니다.",
  //   "contents": "hello this post is first post",
  // }
  // const secondPost = {
  //   "title": "두 번째 게시글입니다.",
  //   "contents": "hello this post is second post",
  // }
  // const thirdPost ={
  //   "title": "세 번째 게시글입니다.",
  //   "contents": "hello this post is third post",
  // }
  // before(done => {
  //   request(app)
  //     .post('/posts')
  //     .auth(auth.token, { type: 'bearer' })
  //     .send(firstPost)
  //     .expect(201)
  //     .end((err, res) => {
  //       body = res.body;
  //       done();
  //     })
  // })
  // before(done => {
  //   request(app)
  //     .post('/posts')
  //     .auth(auth.token, { type: 'bearer' })
  //     .send(secondPost)
  //     .expect(201)
  //     .end((err, res) => {
  //       body = res.body;
  //       done();
  //     })
  // });
  // before(done => {
  //   request(app)
  //     .post('/posts')
  //     .auth(auth.token, { type: 'bearer' })
  //     .send(thirdPost)
  //     .expect(201)
  //     .end((err, res) => {
  //       body = res.body;
  //       done();
  //     })
  // });
}

// 게시글 목록을 나타내는 데이터
// const posts = [
//   {
//     "title": "첫 번째 게시글입니다.",
//     "contents": "hello this post is first post",
//   },
//   {
//     "title": "두 번째 게시글입니다.",
//     "contents": "hello this post is second post",
//   },
//   {
//     "title": "세 번째 게시글입니다.",
//     "contents": "hello this post is third post",
//   },
// ]


// function signupUser() {
//   return done => {
//     request(app)
//       .post('/auth/signup')
//       .send({
//         "email": "haemil@gmail.com",
//         "password": "1234",
//         "nickname": "ham"
//       })
//       .expect(201)
//       .end(done)
//   }
// }

// function loginUser(auth) {
//   return function(done) {
//     request(app)
//       .post('/auth/signin')
//       .send({
//         email: 'haemil@gmail.com',
//         password: '1234'
//       })
//       .expect(200)
//       .end(onResponse);

//     function onResponse(err, res) {
//       auth.token = res.body.accessToken;
//       // console.log('token: ',auth.token);
//       return done();
//     }
//   };
// }