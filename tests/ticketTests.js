const request = require("supertest")("http://localhost:3000/tickets");
const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require('chai-http');
require("../index");

chai.use(chaiHttp);

describe("CR Tickets + Validate by an Employee", () => {
  it("Return all tickets",
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
  it("Book a Ticket",
  async () => {
    await request
      .post('/book')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmRhNDVjYzIyMTIxYzJmNWE3N2ZjZiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjczMzc1NzEzLCJleHAiOjE2NzMzNzkzMTN9.RIJUPSVWYQvXhtgA_o5loCMNiK-qinayBN3PrkJrfmA')
      .send({ userEmail: 'admin1@gmail.com', trainName: "B23R"})
      .then(res => {
        expect(res.statusCode).to.equal(200);
        console.log("Status HTTP : " + res.statusCode);
      })
      .catch(error => {
        throw new Error(error)
      })
  });
    it("Validate a Ticket",
    async () => {
      await request
        .post('/validate')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmRhNDVjYzIyMTIxYzJmNWE3N2ZjZiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjczMzc1NzEzLCJleHAiOjE2NzMzNzkzMTN9.RIJUPSVWYQvXhtgA_o5loCMNiK-qinayBN3PrkJrfmA')
        .query({ ticketId: "63bca39176a228c78dba131b"})
        .send({ start_station: 'Caen', end_station: "Fougeres"})
        .then(res => {
          expect(res.statusCode).to.equal(200);
          console.log(res.statusCode);
        })
        .catch(error => {
          throw new Error(error)
        })
    });
});

