const request = require('supertest');
const { set } = require('../app');
const app = require('../app')

/*SHOW test que muestra todos los datos*/
it('respond with html containing a list of all companies', (done) =>{
    request(app)
    .get('/companies/showCompany')
        .set('Accept', 'application/html')
            .expect('Content-Type', /html/)
                .expect(200, done);
});
/* Test para realizar una busqueda*/
it("respond with html containing a single company", (done)=>{
    request(app)
    .get('/companies/searchCompany/6234bde44d54cf47a0b734c1')
        .set('Accept', 'application/html')
            .expect('Content-Type', /html/)
                .expect(200, done);
});
/** test para guardar informacion */
it('save all the information of company', done =>{

    const data = {
        numero_documento: 'f877as87781',
        nombre: 'La Pachav2',
        tipo: 'Industrial',
        aprobado_por: 'Miguel',
        fecha_inicio: '12/12/2012',
        descripcion: 'Comania de licor'
    }
    request(app)
    .post('/companies/saveCompany')
        .send(data)
            .set('Accept', 'application/html')
                .expect('Content-Type', /html/)
                    .expect(200)
                        .end(err =>{
                            if(err) return done(err);
                            done();
                        });
});
/** test para eliminar */
it("delete company", (done)=>{
    request(app)
    .post('/companies/deleteCompany/6240e665221fb94668adea17')
        .set('Accept', 'application/html')
            .expect('Content-Type', /html/)
                .expect(200, done);
});