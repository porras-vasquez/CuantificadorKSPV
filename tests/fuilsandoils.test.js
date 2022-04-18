const request = require('supertest')
const app = require('../app')
/*SHOW test que muestra todos los datos*/
it('respond with html containing a list of all fuels and oil', () =>{
    request(app)
    .get('/fuelsAndOil/fuelsAndOilShow/6234f480878e1521c0e5e3b2')
        .set('Accept', 'application/html')
            .expect('Content-Type', /html/)
                .expect(200);
});
/* Test para realizar una busqueda*/
it("respond with html containing a single fuils and oils", (done)=>{
    request(app)
    .get('/fuelsAndOil/searchFuelsAndOil/6234f480878e1521c0e5e3b2')
        .set('Accept', 'application/html')
            .expect('Content-Type', /html/)
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
            .set('Accept', 'application/html')
                .expect('Content-Type', /html/)
                    .expect(200)
                        .end(err =>{
                            if(err) return done(err);
                            done();
                        });
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
    .post('/fuelsAndOil/updateFuelsAndOil/624141cda8f88240f0820309')
        .send(data)
            .set('Accept', 'application/html')
                .expect('Content-Type', /html/)
                    .expect(200, done);
});
/* test para eliminar */
it("delete fuils and oils", (done)=>{
    request(app)
    .post('/fuelsAndOil/deleteFuelsAndOil/6243283648f81e299c2d5297/622c2682e592c22e5044c81b')
        .set('Accept', 'application/html')
            .expect('Content-Type', /html/)
                .expect(200, done);
});
