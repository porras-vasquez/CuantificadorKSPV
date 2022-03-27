const request = require('supertest')
const app = require('../app')

it('respond with json containing a list of all gases', () =>{
    request(app)
    .get('/gaseslp/gasesshow/6234bde44d54cf47a0b734c1')
        .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
                .expect(200);
});