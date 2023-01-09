const request = require("supertest")("http://localhost:3000/users");
const expect = require("chai").expect;

// describe('Router', () => {
//     it('GET /users', async () => {
//         await supertest(app)
//             .get('/users')
//             .expect(200)
//             .then(res => {
//                 assert.equal(typeof (res.body), object)
//                 assert.equal(res.body.length, 3)
//                 res.body.forEach(element => {
//                     const prop = Object.keys(element).join('-')
//                     assert.match(prop, /id-name-nickname/)
//                 });
//             })

//     })
// })

describe("GET /users/find", () => {
  it("Return all users", done => {
    async () => {
      const res = await request.get("/find");
      
      expect(res.status).to.eql(200);
      done();
    }
});
});
