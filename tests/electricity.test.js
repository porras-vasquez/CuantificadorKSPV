const request = require('supertest');
const { set } = require('../app');
const app = require('../app')

/*SHOW test que muestra todos los datos*/
it('respond with json containing a list of all electricities', (done) =>{
    request(app)
    .get('/electricities/electricities/622c2682e592c22e5044c81b')
        .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
                .expect(200, done);
});
/* Test para realizar una busqueda*/
it("respond with json containing a single electricity", (done)=>{
    request(app)
    .get('/electricities/editElectricity/623690133929f43a5ce4a1d8')
        .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
                .expect(200, done);
});
/** test para guardar informacion */
it('save all the information of electricity', done =>{

    const data = {
        titulo: 'adasdasd',
        unidad_medida: 'kw',
        fuente_reporte: 'sadasdasd',
        ultima_update: '22/10/2019',
        factor_emision: '0.06',
        gei: 'asjidja',
        pcg: 'okokokok',
        total: '1000'
    }
    request(app)
    .post('/electricities/saveElectricity/622c2682e592c22e5044c81b')
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
it("delete electricity", (done)=>{
    request(app)
    .post('/electricities/deleteElectricity/62412898a07d560154b42b74/622c2682e592c22e5044c81b')
        .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
                .expect(200, done);
});