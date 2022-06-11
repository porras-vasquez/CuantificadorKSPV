const request = require('supertest')
const app = require('../app')
const gas = require('../controllers/GasesController')

it('respond with html containing a list of all gases', () =>{
    request(app)
    .get('/gaseslp/gasesshow/62412386c29e4f41a8fb1dee')
        .set('Accept', 'application/html')
            .expect('Content-Type', /html/)
                .expect(200);
});
it("respond with html containing a single gas", (done)=>{
    request(app)
    .get('/gaseslp/editGases/62412386c29e4f41a8fb1dee')
        .set('Accept', 'application/html')
            .expect('Content-Type', /html/)
                .expect(200, done);
}); 
it('save all the information of gas ', done =>{
    const data = {
        unidad: 'Kilogramo',
        uso: 'Cocinas',
        enero: '10',
        febrero: '10',
        marzo: '10',
        abril: '10',
        mayo: '10',
        junio: '10',
        julio: '10',
        agosto: '10',
        septiembre: '10',
        octubre: '10',
        noviembre: '10',
        diciembre: '10',
        densidad: '10',
        observacion: 'Gran gasto',
        emision: 'CH4',
        gei: 'CO2',
        pcg: '3',
    }
    request(app)
    .post('/gaseslp/saveGas/6234bde44d54cf47a0b734c1')
        .send(data)
            .set('Accept', 'application/html')
                .expect('Content-Type', /html/)
                    .expect(200)
                        .end(err =>{
                            if(err) return done(err);
                            done();
                        });
});
it('update all the information of gas', (done) =>{
    const data = {
        unidad: 'Kilogramo',
        uso: 'Cocinas',
        enero: '10',
        febrero: '10',
        marzo: '10',
        abril: '10',
        mayo: '10',
        junio: '10',
        julio: '10',
        agosto: '10',
        septiembre: '10',
        octubre: '10',
        noviembre: '10',
        diciembre: '10',
        densidad: '10',
        observacion: 'Gran gasto',
        emision: 'CH4',
        gei: 'CO2',
        pcg: '2',
    }
    request(app)
    .post('/gaseslp/updateGases/624123b3d8d98f12e4b7c42d')
        .send(data)
            .set('Accept', 'application/html')
                .expect('Content-Type', /html/)
                    .expect(200, done);
});
it("delete gas", (done)=>{
    request(app)
    .post('/gaseslp/deleteGases/62469d061a123d299066684d/6234bde44d54cf47a0b734c1')
        .set('Accept', 'application/html')
            .expect('Content-Type', /html/)
                .expect(200, done);
});
