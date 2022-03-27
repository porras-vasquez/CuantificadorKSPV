const request = require('supertest');
const { set } = require('../app');
const app = require('../app')

/*SHOW test que muestra todos los datos*/
it('respond with json containing a list of all users', (done) =>{
    request(app)
    .get('/users/show')
        .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
                .expect(200, done);
});
/* Test para realizar una busqueda*/
it("respond with json containing a single user", (done)=>{
    request(app)
    .get('/users/search/62203979f485525b84be6132')
        .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
                .expect(200, done);
});
/** test para guardar informacion */
it('save all the information of user', done =>{

    const data = {
        username: 'test',
        password: '1234',
        email: 'test@test'
    }
    request(app)
    .post('/users/save')
        .send(data)
            .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                    .expect(200)
                        .end(err =>{
                            if(err) return done(err);
                            done();
                        });
});
/** test para eliminar */
it("delete user", (done)=>{
    request(app)
    .post('/users/delete/624010a65d14130d90adb256')
        .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
                .expect(200, done);
});

