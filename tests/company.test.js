const request = require('supertest');
const { set } = require('../app');
const app = require('../app')

/*SHOW test que muestra todos los datos*/
it('respond with json containing a list of all companies', (done) =>{
    request(app)
    .get('/companies/showCompany')
        .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
                .expect(200, done);
});
/* Test para realizar una busqueda*/
it("respond with json containing a single company", (done)=>{
    request(app)
    .get('/companies/searchCompany/622c2682e592c22e5044c81b')
        .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
                .expect(200, done);
});
/** test para guardar informacion */
it('save all the information of company', done =>{

    const data = {
        numero_documento: 'f877as87781',
        nombre: 'asdasd',
        tipo: 'Industrial',
        aprobado_por: 'Miguel',
        fecha_inicio: '12/12/2012',
        descripcion: 'asdiqduiashd0'
    }
    request(app)
    .post('/companies/saveCompany')
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
it("delete company", (done)=>{
    request(app)
    .post('/companies/deleteCompany/6240ded8184e3022e8ef67c9')
        .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
                .expect(200, done);
});