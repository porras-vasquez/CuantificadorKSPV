const request = require('supertest')
const app = require('../app')
/*SHOW test que muestra todos los datos*/
it('respond with html containing a list of all fuels and oil', () =>{
    request(app)
    .get('/airConditioning/airConditioningShow/628c7c376f74231af00cbb25')
        .set('Accept', 'application/html')
            .expect('Content-Type', /html/)
                .expect(200);
});
/* Test para realizar una busqueda*/
it("respond with html containing a single fuils and oils", (done)=>{
    request(app)
    .get('/airConditioning/searchAirConditioning/627f090d7a694826b85c609e')
        .set('Accept', 'application/html')
            .expect('Content-Type', /html/)
                .expect(200, done);
});
it('save all the information of fuils and oils.', done =>{
    const data = {
                ubicacion: '889',
                serie: '8475',
                marca: '44345',
                modelo: '4444',
                capacidad: '335',
                consumo: '43',
                tipoRefrigerante: 'R22',
                capacidadConfinamiento: '676',
                aplicacion: '44',
                tasaAnualFuga: '34',
                potencialCalentamineto: '3',
                factor_emision: '887'
    }
    request(app)
    .post('/airConditioning/saveAirConditioning/628c7c376f74231af00cbb25')
        .send(data)
            .set('Accept', 'application/html')
                .expect('Content-Type', /html/)
                    .expect(200)
                        .end(err =>{
                            if(err) return done(err);
                            done();
                        });
});