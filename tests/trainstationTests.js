const request = require("supertest")("http://localhost:3000/trainstations");
const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require('chai-http');
require("../index");

chai.use(chaiHttp);

/*
 * Liste de toutes les gares
 */

describe("GET /trainstations/find", () => {
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
});



/*
 * Delete une gare en tant qu'admin
 */

// describe("DELETE /trainstations/delete", () => {
//     it("Delete trainstation",
//       async () => {
//         await request
//           .delete('/delete')
//           .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmQ2ZDkzOWFhZGRlMWY0OWRhYWFjYyIsImVtYWlsIjoid2lsbHlhQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY3MzM2ODUzMCwiZXhwIjoxNjczMzcyMTMwfQ.D4Z0-rm_LABMZtYlf28PlM9rfku2NNqxd5_zVQTKJ6I')
//           .send({ name: "SDFStationCaen"})
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
 * Update une gare en tant qu'admin
 */

//   describe("PUT /trainstations/update", () => {
//     it("Update trainstation",
//     async () => {
//       await request
//           .put("/update")
//           .query({ _id: '63b8ae51b240c1d4d909b515',})
//           .send({ name: "Chicago" })
//           .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmQ2ZDkzOWFhZGRlMWY0OWRhYWFjYyIsImVtYWlsIjoid2lsbHlhQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY3MzM2ODUzMCwiZXhwIjoxNjczMzcyMTMwfQ.D4Z0-rm_LABMZtYlf28PlM9rfku2NNqxd5_zVQTKJ6I')
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
 * Update une gare en tant qu'admin
 */

// describe("PUT /trainstations/update", () => {
//     it("Update trainstation",
//     async () => {
//       await request
//           .put("/update")
//           .query({ _id: '63b8ae51b240c1d4d909b515',})
//           .send({ name: "Chicago" })
//           .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmQ2ZDkzOWFhZGRlMWY0OWRhYWFjYyIsImVtYWlsIjoid2lsbHlhQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY3MzM2ODUzMCwiZXhwIjoxNjczMzcyMTMwfQ.D4Z0-rm_LABMZtYlf28PlM9rfku2NNqxd5_zVQTKJ6I')
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
 * Ajouter une gare en tant qu'admin
 */

// describe("POST /trainstations/add", () => {
//     it("Create trainstation",
//     async () => {
//       await request
//           .post("/add")
//           .field('name', "New York")
//           .field('open_hour', "10:10")
//           .field('close_hour', "22:22")
//           .attach('image', 'src/img/trainStations/mmecat.jpg')
//           .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmQ2ZDkzOWFhZGRlMWY0OWRhYWFjYyIsImVtYWlsIjoid2lsbHlhQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY3MzM2ODUzMCwiZXhwIjoxNjczMzcyMTMwfQ.D4Z0-rm_LABMZtYlf28PlM9rfku2NNqxd5_zVQTKJ6I')
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
