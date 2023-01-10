const request = require("supertest")("http://localhost:3000/users");
const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require('chai-http');
require("../index");

chai.use(chaiHttp);


describe("CRUD Users", () => {
  it("Return users",
    async () => {
      await request
        .get('/find')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmRhNDVjYzIyMTIxYzJmNWE3N2ZjZiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjczMzcyNzY0LCJleHAiOjE2NzMzNzYzNjR9.-k9tfEpxu5mVM0QpfnUAMqewyIZXesmGAHBH7MAkBUE')
        .then(res => {
          expect(res.statusCode).to.equal(200);
          console.log(res.statusCode);
        })
        .catch(error => {
          throw new Error(error)
        })
    });
  it("Login",
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
  it("Register",
  async () => {
    await request
        .post("/register")
        .send({
          pseudo: "testpseudo123",
          email: "test131@email.com",
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
  it("Update",
    async () => {
      await request
          .put("/update")
          .send({
            pseudo: "guillaume1"
          })
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmMwYzRkMDVlZDgyMGM5OWU5MmVkMyIsImVtYWlsIjoiYWRtaW4xQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY3MzMwNjI5MywiZXhwIjoxNjczMzA5ODkzfQ.DOMqjC8Ux4uy476yd1s0tAKVXeCfRePXIUW7yeIyul8')
          .query({ id: '63bc0c4d05ed820c99e92ed3',})
          .then(res => {
            expect(res.statusCode).to.equal(200);
            console.log(res.statusCode);
            console.log(res.body.token)
          })
          .catch(error => {
            throw new Error(error)
          })
      });
  it("Delete"), () => {
      async () => {
        await request
          .delete("/delete")
          .send({
            email: "guillaume@gmail.com"
          })
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmMwYzRkMDVlZDgyMGM5OWU5MmVkMyIsImVtYWlsIjoiYWRtaW4xQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY3MzMwOTk2MywiZXhwIjoxNjczMzEzNTYzfQ.ePXLm7_3eLG8zo4ec4dwHGevYHUy417nAq8Hpz6G_8M')
          .then(res => {
            expect(res.statusCode).to.equal(200);
            console.log(res.statusCode);
            console.log(res.body.token)
          })
          .catch(error => {
            throw new Error(error)
          })
      }};
});
