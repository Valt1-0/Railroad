const request = require("supertest")("http://localhost:3000/trains");
const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require('chai-http');
require("../index");

chai.use(chaiHttp);

/*
 * Liste des train
 */

// describe("GET /trains/find", () => {
//     it("Return all trains",
//       async () => {
//         await request
//           .get('/find')
//           .then(res => {
//             expect(res.statusCode).to.equal(200);
//             console.log(res.statusCode);
//           })
//           .catch(error => {
//             throw new Error(error)
//           })
//       });
//   });

/*
 *  Delete un train en tant qu'admin
 */

// describe("DELETE /trains/delete", () => {
//     it("Delete train if admin",
//     async () => {
//         await request
//             .delete('/delete')
//             .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmQ5OGJjNjNjMGYzODY1YWUzZmIxMiIsImVtYWlsIjoiYWRtaW4xQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY3MzM3MTc0MiwiZXhwIjoxNjczMzc1MzQyfQ.75UlXBOVpusdvFavXG5vLlslMnlD0-gvHI45Z2wo2VM')
//             .send({ name: "testdelete"})
//             .then(res => {
//              expect(res.statusCode).to.equal(200);
//              console.log(res.statusCode);
//             })
//              .catch(error => {
//               throw new Error(error)
//             })
//     });
// });

/*
 *  Update un train en tant qu'admin
 */

// describe("PUT /trains/update", () => {
//     it("Update trains",
//     async () => {
//       await request
//           .put("/update")
//           .query({ _id: '63bda3451f89c35e8cee09f4',})
//           .send({ name: "testdelete" })
//           .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmQ5OGJjNjNjMGYzODY1YWUzZmIxMiIsImVtYWlsIjoiYWRtaW4xQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY3MzM3MTc0MiwiZXhwIjoxNjczMzc1MzQyfQ.75UlXBOVpusdvFavXG5vLlslMnlD0-gvHI45Z2wo2VM')
//           .then(res => {
//             expect(res.statusCode).to.equal(200);
//             console.log(res.statusCode);
//             console.log(res.body.token)
//           })
//           .catch(error => {
//             throw new Error(error)
//           })
//       });
//   });

/*
 *  Ajoute un train en tant qu'admin
 */

//   describe("POST /trains/add", () => {
//     it("Create trains",
//     async () => {
//       await request
//           .post("/add")
//           .field('name', "train123")
//           .field('start_station', "Caen")
//           .field('end_station', "Paris")
//           .field('time_of_departure', "10:10")
//           .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmQ5OGJjNjNjMGYzODY1YWUzZmIxMiIsImVtYWlsIjoiYWRtaW4xQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY3MzM3MzE3NiwiZXhwIjoxNjczMzc2Nzc2fQ.oZalat4yeubyppyNt9LlNpkD1rGBmMZl7FFZ1191Dhg')
//           .then(res => {
//             expect(res.statusCode).to.equal(200);
//             console.log(res.statusCode);
//             console.log(res.body.token)
//           })
//           .catch(error => {
//             throw new Error(error)
//           })
//       });
//   });