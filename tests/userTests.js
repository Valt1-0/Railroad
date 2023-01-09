const request = require("supertest")("http://localhost:3000/users");
const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require('chai-http');
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

// /*
//  * LOGIN
//  */

// describe("POST /login", () => {
//   it("it should not login a user if email is not found", done => {
//     chai.request(server).post("/login").send({ email: "test@email.com", password: "testpassword"}).end((err, res) => {
//       res.should.have.status(404);
//       done();
//     });
//   })
  
//   it("it should not logging a user if password is incorrect", done => {

//     user.save((err, user) => {
//       chai
//         .request(server)
//         .post("/login")
//         .send({
//           email: "test@email.com",
//           password: "wrongpassword"
//         })
//         .end((err, res) => {
//           res.should.have.status(401);
//           done();
//         });
//     });
//   });

//   it("it should login a user if email and password are correct", done => {
//     // Créez un utilisateur de test avant de tester la route de connexion
//     const user = new User({
//       email: "test@email.com",
//       password: "testpassword"
//     });
//     user.save((err, user) => {
//       chai
//         .request(server)
//         .post("/login")
//         .send({
//           email: "test@email.com",
//           password: "testpassword"
//         })
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.have.property("token");
//           done();
//         });
//     });
//   });

//   it("it should login a user if email and password are correct", done => {
//     user.body((err, user) => {
//       chai
//         .request(server)
//         .post("/login")
//         .send({
//           email: "test@email.com",
//           password: "testpassword"
//         })
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.have.property("token");
//           done();
//         });
//     });
//   });
// });

// /*
//  * REGISTER
//  */

// describe("POST /register", () => {
//   // Testez la route de registration avec un e-mail déjà enregistré
//   it("it should not register a user if email already exists", done => {
//     User.findOne({ email: "test@test.com" }, (err, user) => {
//       if (err) {
//         // Gestion de l'erreur
//       } else if (user) {
//         // Si l'utilisateur existe déjà, testez la route de registration
//         chai
//           .request(server)
//           .post("/register")
//           .send({
//             email: "test@test.com",
//             password: "testpassword"
//           })
//           .end((err, res) => {
//             res.should.have.status(409);
//             done();
//           });
//       } else {
//         // Si l'utilisateur n'existe pas, créez-le d'abord avant de tester la route de registration
//         const user = new User({
//           email: "test@test.com",
//           password: "testpassword"
//         });
//         user.save((err, user) => {
//           if (err) {
//             // Gestion de l'erreur
//           } else {
//             chai
//               .request(server)
//               .post("/register")
//               .send({
//                 email: "test@test.com",
//                 password: "testpassword"
//               })
//               .end((err, res) => {
//                 res.should.have.status(409);
//                 done();
//               });
//           }
//         });
//       }
//     });
//   });
  
//   // Testez la route de registration avec un e-mail valide et un mot de passe valide
//   it("it should register a new user if email is valid and password is valid", done => {
//     chai
//       .request(server)
//       .post("/register")
//       .send({
//         email: "test@test.com",
//         password: "testpassword"
//       })
//       .end((err, res) => {
//         res.should.have.status(201);
//         res.body.should.have.property("token");
//         done();
//       });
//   });
// });