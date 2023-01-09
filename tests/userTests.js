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
  it("Return all users", async () => {
    const res = await request.get("/find");

    expect(res.status).to.eql(200);
  });
});

/*
 * LOGIN
 */

describe("POST /login", () => {
  it("it should not login a user if email is not found", done => {
    chai.request(server).post("/login").send({ email: "test@email.com", password: "testpassword"}).end((err, res) => {
      res.should.have.status(404);
      done();
    });
  })
  
  it("it should not logging a user if password is incorrect", done => {

    user.save((err, user) => {
      chai
        .request(server)
        .post("/login")
        .send({
          email: "test@email.com",
          password: "wrongpassword"
        })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  it("it should login a user if email and password are correct", done => {
    // Créez un utilisateur de test avant de tester la route de connexion
    const user = new User({
      email: "test@email.com",
      password: "testpassword"
    });
    user.save((err, user) => {
      chai
        .request(server)
        .post("/login")
        .send({
          email: "test@email.com",
          password: "testpassword"
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("token");
          done();
        });
    });
  });

  it("it should login a user if email and password are correct", done => {
    user.body((err, user) => {
      chai
        .request(server)
        .post("/login")
        .send({
          email: "test@email.com",
          password: "testpassword"
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("token");
          done();
        });
    });
  });
});

/*
 * REGISTER
 */

describe("POST /register", () => {
  // Testez la route de registration avec un e-mail déjà enregistré
  it("it should not register a user if email already exists", done => {
    User.findOne({ email: "test@test.com" }, (err, user) => {
      if (err) {
        // Gestion de l'erreur
      } else if (user) {
        // Si l'utilisateur existe déjà, testez la route de registration
        chai
          .request(server)
          .post("/register")
          .send({
            email: "test@test.com",
            password: "testpassword"
          })
          .end((err, res) => {
            res.should.have.status(409);
            done();
          });
      } else {
        // Si l'utilisateur n'existe pas, créez-le d'abord avant de tester la route de registration
        const user = new User({
          email: "test@test.com",
          password: "testpassword"
        });
        user.save((err, user) => {
          if (err) {
            // Gestion de l'erreur
          } else {
            chai
              .request(server)
              .post("/register")
              .send({
                email: "test@test.com",
                password: "testpassword"
              })
              .end((err, res) => {
                res.should.have.status(409);
                done();
              });
          }
        });
      }
    });
  });
  
  // Testez la route de registration avec un e-mail valide et un mot de passe valide
  it("it should register a new user if email is valid and password is valid", done => {
    chai
      .request(server)
      .post("/register")
      .send({
        email: "test@test.com",
        password: "testpassword"
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property("token");
        done();
      });
  });
});