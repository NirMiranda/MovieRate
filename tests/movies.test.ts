
// const request = require("supertest");
// const app = require("../app")
// const mongoose = require("mongoose");
// const Movies = require("../models/movie_model");
beforeAll(done => {
    done()
});
afterAll((done) => {
    done();
});
describe("movie test 1", () => {
    test("This is initial test pass", async () => {
        const temp = 2
        expect(temp).toEqual(2)
    });
});
describe("Movie Post test ", () => {
    // test("Movie Post", async () => {
    //     const response = await request(app).get("/movies");
    //     expect(response.statusCode).toEqual(200);
    // });
});