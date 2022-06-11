const request = require('supertest');
const { set } = require('../app');
const app = require('../app')
it('respond with html containing a list of all users', (done) =>{
    request(app)
    .get('/users/show')
        .set('Accept', 'application/html')
            .expect('Content-Type', /html/)
                .expect(200, done);
});
it("respond with html containing a single user", (done)=>{
    request(app)
    .get('/users/search/62203979f485525b84be6132')
        .set('Accept', 'application/html')
            .expect('Content-Type', /html/)
                .expect(200, done);
});
it('save all the information of user', done =>{
/**
    const data = {
        username: 'test',
        password: 'ufuewgfuwefu837489784772ybd',
        email: 'test@test'
    }*/
    request(app)
    .post('/users/save')
        .send(data)
            .set('Accept', 'application/html')
                .expect('Content-Type', /html/)
                    .expect(200)
                        .end(err =>{
                            if(err) return done(err);
                            done();
                        });
});
it('update all the information of user', (done) =>{
    const data = {
        username: 'testUpdated',
        email: 'test@test'
    }
    request(app)
    .post('/users/update/624099dee7a7961238bc446e')
        .send(data)
            .set('Accept', 'application/html')
                .expect('Content-Type', /html/)
                    .expect(200, done);
});
it("delete user", (done)=>{
  request(app)
  .post('/users/delete/624010a65d14130d90adb256')
      .set('Accept', 'application/html')
          .expect('Content-Type', /html/)
              .expect(200, done);
});