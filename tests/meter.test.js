const request = require('supertest');
const { set } = require('../app');
const app = require('../app')
it('respond with html containing a list of all meters', (done) =>{
    request(app)
    .get('/electricities/meters/6236c45870128e323c51b049')
        .set('Accept', 'application/html')
            .expect('Content-Type', /html/)
                .expect(200, done);
});
it("respond with html containing a single meter", (done)=>{
    request(app)
    .get('/electricities/editMeter/6236c45870128e323c51b049/625de31ac5fb6e0ab83df5aa')
        .set('Accept', 'application/html')
            .expect('Content-Type', /html/)
                .expect(200, done);
});
it('save all the information of meter', done =>{

    const data = {
        numero : '1123',
        nise : '2fdsfds',
        ubicacion : 'abajo',
        enero: '1',
        febrero: '2',
        marzo: '3',
        abril: '4',
        mayo: '5',
        junio: '6',
        julio: '7',
        agosto: '8',
        septiembre: '9',
        octubre: '10',
        noviembre: '11',
        diciembre: '12',
        total: '78'
    }
    request(app)
    .post('/electricities/addMeter/6236c45870128e323c51b049/622c2682e592c22e5044c81b')
        .send(data)
            .set('Accept', 'application/html')
                .expect('Content-Type', /html/)
                    .expect(200)
                        .end(err =>{
                            if(err) return done(err);
                            done();
                        });
});
it("delete meter", (done)=>{
    request(app)
    .post('/electricities/deleteMeter/6236c45870128e323c51b049/6236c47570128e323c51b05c')
        .set('Accept', 'application/html')
            .expect('Content-Type', /html/)
                .expect(200, done);
});