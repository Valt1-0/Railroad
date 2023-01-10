const request = require("supertest")("http://localhost:3000/tickets");
const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require('chai-http');
require("../index");

chai.use(chaiHttp);

/*
 * Liste de tous les tickets (option)
 */

// describe("GET /ticket/find", () => {
//   it("Return all tickets",
//     async () => {
//       await request
//         .get('/find')
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
 * Achat de tickets
 */

// describe("POST /ticket/book", () => {
//   it("Book a Ticket",
//   async () => {
//     await request
//       .post('/book')
//       .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmM0NDcyN2I2NmU2YTk0NzIxZjlhZiIsImVtYWlsIjoiZW1wbG95ZWUyQGdtYWlsLmNvbSIsInJvbGUiOiJFbXBsb3llZSIsImlhdCI6MTY3MzMwNjAzOSwiZXhwIjoxNjczMzA5NjM5fQ.l-fgQvrDaapWSs5lxm_Z71OOqo8RnxecfJolkN6LF6Y')
//       .send({ userEmail: 'employee2@gmail.com', trainName: "B23R"})
//       .then(res => {
//         expect(res.statusCode).to.equal(200);
//         console.log("Status HTTP : " + res.statusCode);
//       })
//       .catch(error => {
//         throw new Error(error)
//       })
//   });
// });

/*
 * Validation de tickets
 */

// describe("POST /ticket/validate", () => {
//     it("Validate a Ticket by an Employee",
//     async () => {
//       await request
//         .post('/validate')
//         .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmM0NDcyN2I2NmU2YTk0NzIxZjlhZiIsImVtYWlsIjoiZW1wbG95ZWUyQGdtYWlsLmNvbSIsInJvbGUiOiJFbXBsb3llZSIsImlhdCI6MTY3MzMwNzY2NiwiZXhwIjoxNjczMzExMjY2fQ.3hhknzLCE0iN2diB--6M3HrrERtfUuKa24yld3xBRg8')
//         .query({ ticketId: "63bca39176a228c78dba131b"})
//         .send({ start_station: 'Caen', end_station: "Fougeres"})
//         .then(res => {
//           expect(res.statusCode).to.equal(200);
//           console.log(res.statusCode);
//         })
//         .catch(error => {
//           throw new Error(error)
//         })
//     });
// });

