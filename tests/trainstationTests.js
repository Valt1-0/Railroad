const request = require("supertest")("http://localhost:3000/trainstations");
const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require('chai-http');
require("../index");

chai.use(chaiHttp);


describe("CRUD Trainstations", () => {
  it("Return all trainstations",
    async () => {
      await request
        .get('/find')
        .then(res => {
          expect(res.statusCode).to.equal(200);
          console.log(res.statusCode);
        })
        .catch(error => {
          throw new Error(error)
        })
    });
    it("Create trainstation",
    async () => {
      await request
          .post("/add")
          .field('name', "Bagdad")
          .field('open_hour', "10:10")
          .field('close_hour', "22:22")
          .attach('image', 'src/img/trainStations/mmecat.jpg')
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmRhNDVjYzIyMTIxYzJmNWE3N2ZjZiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjczMzc1NzEzLCJleHAiOjE2NzMzNzkzMTN9.RIJUPSVWYQvXhtgA_o5loCMNiK-qinayBN3PrkJrfmA')
          .then(res => {
            expect(res.statusCode).to.equal(200);
            console.log(res.statusCode);
            console.log(res.body.token)
          })
          .catch(error => {
            throw new Error(error)
          })
      });
    it("Update trainstation",
    async () => {
      await request
          .put("/update")
          .query({ _id: '63b8b4e4349f500bb383162a',})
          .send({ name: "Bagdad1" })
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmRhNDVjYzIyMTIxYzJmNWE3N2ZjZiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjczMzc1NzEzLCJleHAiOjE2NzMzNzkzMTN9.RIJUPSVWYQvXhtgA_o5loCMNiK-qinayBN3PrkJrfmA')
          .then(res => {
            expect(res.statusCode).to.equal(200);
            console.log(res.statusCode);
            console.log(res.body.token)
          })
          .catch(error => {
            throw new Error(error)
          })
      });
      it("Delete trainstation",
      async () => {
        await request
          .delete('/delete')
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmRhNDVjYzIyMTIxYzJmNWE3N2ZjZiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjczMzc1NzEzLCJleHAiOjE2NzMzNzkzMTN9.RIJUPSVWYQvXhtgA_o5loCMNiK-qinayBN3PrkJrfmA')
          .send({ name: "Bagdad1"})
          .then(res => {
            expect(res.statusCode).to.equal(200);
            console.log(res.statusCode);
          })
          .catch(error => {
            throw new Error(error)
          })
      });
});
