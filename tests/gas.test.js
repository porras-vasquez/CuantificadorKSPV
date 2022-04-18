const request = require('supertest')
const app = require('../app')
const gas = require('../controllers/GasesController')
/*SHOW test que muestra todos los datos
it('respond with json containing a list of all gases', () =>{
    request(app)
    .get('/gaseslp/gasesshow/6234bde44d54cf47a0b734c1')
        .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
                .expect(200);
});*/
/* Test para realizar una busqueda
describe("Testing a view", function () {
    const req = {
        params: {
            id: '62412386c29e4f41a8fb1dee'
        }
    };*/

  /* --- beforeEach(function () {*/    
        /*console.log('pasa');
        const resultT = gas.search(req);

        it("render() should return the view object", function () {
            expect(this.resultT.render()).equal(this.resultT.render(
                "../views/gaseslp/EditGas", {
                    gaslp: gaslp,
                    company: gaslp.company,
                }
            ))
        });*/
  /*  });
});--*/
/** test para guardar informacion 
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
            .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                    .expect(200)
                        .end(err =>{
                            if(err) return done(err);
                            done();
                        });
});*/
/* test para eliminar
it("delete gas", (done)=>{
    request(app)
    .post('/gaseslp/deleteGases/6238cc4d1bd88a0904f1d23b/6234bde44d54cf47a0b734c1')
        .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
                .expect(200, done);
}); */
/** test para actualizar 
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
    .post('/gaseslp/updateGases/6234bde44d54cf47a0b734c1')
        .send(data)
            .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                    .expect(200, done);
});*/