const request = require('supertest')
const app = require('../app')

/*SHOW*/
it('respond with json containing a list of all users', () =>{
    request(app)
    .get('/users/show')
        .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
                .expect(200);
});
/*ADD*/
/*it('save all the information of user', () =>{
    request(app)
    .save('/users/show')
        .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
                .expect(200);
});

it("should be able to add and complete TODOs", function() {
    let todos = new Todos();
    todos.add("get up from bed");
    todos.add("make up bed");
    assert.strictEqual(todos.list().length, 0);
});*/

