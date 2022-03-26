const request = require('supertest')
const app = require('../app')

it('respond with json containing a list of all users', () =>{
    request(app)
    .get('/users/show')
        .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
                .expect(200);
});