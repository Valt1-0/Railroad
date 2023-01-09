const request = require("supertest")("http://localhost:3000/users");
const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require('chai-http');
const { string } = require("joi");
const { Admin } = require("mongodb");
require("../index");

chai.use(chaiHttp);

describe("GET /users/find", () => {
  it("Return all users",
    async () => {
      await request
        .get('/find')
        .set('Authorization', 'Bearer eydezI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmM0NDcyN2I2NmU2YTk0NzIxZjlhZiIsImVtYWlsIjoiZW1wbG95ZWUyQGdtYWlsLmNvbSIsInJvbGUiOiJFbXBsb3llZSIsImlhdCI6MTY3MzI5Njk4NywiZXhwIjoxNjczMzAwNTg3fQ.V3CEK2ByP-PnhXrks8yzWSENm0OVhR6OWn8uoiwANFM')
        .query({ email: 'employee2@gmail.com',})
        .then(res => {
          expect(res.statusCode).to.equal(200);
          console.log(res.statusCode);
        })
        .catch(error => {
          throw new Error(error)
        })
    });
});

/*
 * LOGIN
 */

describe("POST /users/login", () => {
  it("login with email and password and give session token",
  async () => {
    await request
        .post("/login")
        .send({
          email: "employee2@gmail.com",
          password: "1233456789101112",
        })
        .then(res => {
          expect(res.statusCode).to.equal(200);
          console.log(res.statusCode);
          console.log(res.body.token)
        })
        .catch(error => {
          throw new Error(error)
        })
    });
  });

/*
 * REGISTER
 */

// Testez la route de registration avec un e-mail valide et un mot de passe valide
  it("it should register a new user if email and password is valid, and give token",
  async () => {
    await request
        .post("/register")
        .send({
          pseudo: "testpseudo1",
          email: "test1@email.com",
          password: "testpassword1231",
          role: "Admin"
        })
        .then(res => {
          expect(res.statusCode).to.equal(200);
          console.log(res.statusCode);
          console.log(res.body.token)
        })
        .catch(error => {
          throw new Error(error)
        })
    });

// Testez la route de registration avec un e-mail déjà enregistré
  // it("it should not register a user if email already exists", () => {
  //   async () => {
  //     await request
  //         users.findOne({ email: req.body.email }, (err, users) => {
  //     if (err) {
  //       // Gestion de l'erreur
  //     } else if (users) {
  //       // Si l'utilisateur existe déjà, testez la route de registration
  //       chai
  //         .request(server)
  //         .post("/register")
  //         .send({
  //           email: "test@test.com",
  //           password: "testpassword"
  //         })
  //         .end((err, res) => {
  //           res.should.have.status(409);
  //           done();
  //         });
  //     } else {
  //       user.save((err, user) => {
  //         if (err) {
  //           // Gestion de l'erreur
  //         } else {
  //           chai
  //             .request(server)
  //             .post("/register")
  //             .send({
  //               email: "test@test.com",
  //               password: "testpassword"
  //             })
  //             .end((err, res) => {
  //               res.should.have.status(409);
  //               done();
  //             });
  //         }
  //       });
  //     }
  //   });
  // });