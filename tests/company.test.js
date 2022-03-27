const request = require('supertest')
const app = require('../app')

it('respond with json containing a list of all companies', () =>{
    request(app)
    .get('/companies/showCompany')
        .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
                .expect(200);
});