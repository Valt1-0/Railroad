const request = require("supertest")("http://localhost:3000/users");
const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require('chai-http');
const { string } = require("joi");
const { Admin } = require("mongodb");
require("../index");

chai.use(chaiHttp);

// describe("GET /users/find", () => {
//   it("Return all users",
//     async () => {
//       await request
//         .get('/find')
//         .set('Authorization', 'Bearer eydezI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmM0NDcyN2I2NmU2YTk0NzIxZjlhZiIsImVtYWlsIjoiZW1wbG95ZWUyQGdtYWlsLmNvbSIsInJvbGUiOiJFbXBsb3llZSIsImlhdCI6MTY3MzI5Njk4NywiZXhwIjoxNjczMzAwNTg3fQ.V3CEK2ByP-PnhXrks8yzWSENm0OVhR6OWn8uoiwANFM')
//         .query({ email: 'employee2@gmail.com',})
//         .then(res => {
//           expect(res.statusCode).to.equal(200);
//           console.log(res.statusCode);
//         })
//         .catch(error => {
//           throw new Error(error)
//         })
//     });
// });

/*
 * LOGIN
 */

// describe("POST /users/login", () => {
//   it("login with email and password and give session token",
//   async () => {
//     await request
//         .post("/login")
//         .send({
//           email: "employee2@gmail.com",
//           password: "1233456789101112",
//         })
//         .then(res => {
//           expect(res.statusCode).to.equal(200);
//           console.log(res.statusCode);
//           console.log(res.body.token)
//         })
//         .catch(error => {
//           throw new Error(error)
//         })
//     });
//   });

/*
 * REGISTER
 */

// Testez la route de registration avec un e-mail valide et un mot de passe valide
// describe("POST /users/register", () => {
//   it("it should register a new user if email and password is valid, and give token",
//   async () => {
//     await request
//         .post("/register")
//         .send({
//           pseudo: "testpseudo123",
//           email: "test131@email.com",
//           password: "testpassword1231",
//           role: "Admin"
//         })
//         .then(res => {
//           expect(res.statusCode).to.equal(200);
//           console.log(res.statusCode);
//           console.log(res.body.token)
//         })
//         .catch(error => {
//           throw new Error(error)
//         })
//     });
// });

/*
 * UPDATE
 */

//a faire quand update user est valide
  // describe("PUT /users/update", () => {
  //   it("it should update a user",
  //   async () => {
  //     await request
  //         .put("/update")
  //         .send({
  //           pseudo: "guillaume1"
  //         })
  //         .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmMwYzRkMDVlZDgyMGM5OWU5MmVkMyIsImVtYWlsIjoiYWRtaW4xQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY3MzMwNjI5MywiZXhwIjoxNjczMzA5ODkzfQ.DOMqjC8Ux4uy476yd1s0tAKVXeCfRePXIUW7yeIyul8')
  //         .query({ id: '63bc0c4d05ed820c99e92ed3',})
  //         .then(res => {
  //           expect(res.statusCode).to.equal(200);
  //           console.log(res.statusCode);
  //           console.log(res.body.token)
  //         })
  //         .catch(error => {
  //           throw new Error(error)
  //         })
  //     });
  // });

  describe("DELETE /users/delete")
    it("it should delete a user"), () => {
      async () => {
        await request
          .delete("/delete")
          .send({})
      }
    }