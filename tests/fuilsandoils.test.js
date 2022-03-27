const request = require('supertest')
const app = require('../app')

it('respond with json containing a list of all electricities', () =>{
    request(app)
    .get('/fuelsAndOil/fuelsAndOilShow/6234bde44d54cf47a0b734c1')
        .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
                .expect(200);
});