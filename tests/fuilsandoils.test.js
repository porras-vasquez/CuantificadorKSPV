const request = require('supertest')
const app = require('../app')
/*SHOW test que muestra todos los datos*/
it('respond with json containing a list of all fuels and oil', () =>{
    request(app)
    .get('/fuelsAndOil/fuelsAndOilShow/6234bde44d54cf47a0b734c1')
        .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
                .expect(200);
});
/* Test para realizar una busqueda*/
it("respond with json containing a single fuils and oils", (done)=>{
    request(app)
    .get('/fuelsAndOil/searchFuelsAndOil/62203979f485525b84be6132')
        .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
                .expect(200, done);
});
/** test para guardar informacion */
it('save all the information of fuils and oils.', done =>{
    const data = {
        combustible: 'Diesel',
        enero: '4',
        febrero: '4',
        marzo: '4',
        abril: '4',
        mayo: '4',
        junio: '4',
        julio: '4',
        agosto: '4',
        septiembre: '4',
        octubre: '4',
        noviembre: '4',
        diciembre: '4',
        emision: '4',
        gei: 'C02',
        pcg: '4',
    }
    request(app)
    .post('/fuelsAndOil/saveFuelsAndOil/6234bde44d54cf47a0b734c1')
        .send(data)
            .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                    .expect(200)
                        .end(err =>{
                            if(err) return done(err);
                            done();
                        });
});
/* test para eliminar */
it("delete fuils and oils", (done)=>{
    request(app)
    .post('/fuelsAndOil/deleteFuelsAndOil/62413a15c838370aac1d14e3/6234bde44d54cf47a0b734c1')
        .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
                .expect(200, done);
});
/** test para actualizar */
it('update all the information of fuils and oils', (done) =>{
    const data = {
        combustible: 'Diesel',
        enero: '4',
        febrero: '4',
        marzo: '4',
        abril: '4',
        mayo: '4',
        junio: '4',
        julio: '4',
        agosto: '4',
        septiembre: '4',
        octubre: '4',
        noviembre: '4',
        diciembre: '4',
        emision: '4',
        gei: 'C02',
        pcg: '8',
    }
    request(app)
    .post('/fuelsAndOil/updateFuelsAndOil/6234f480878e1521c0e5e3b2')
        .send(data)
            .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                    .expect(200, done);
});