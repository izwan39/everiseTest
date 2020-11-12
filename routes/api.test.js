const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);

it("Posts the api endpoint", async done => {
    // Sends GET Request to /test endpoint
    const response = await request.post("/api")
        .send({url:'http://the-internet.herokuapp.com/status_codes/404'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);
  
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(404);
    done();
});