const request = require("supertest");
const app = require("../app");
const mongoose = require('mongoose');

beforeAll((done) => {
    done();
});
afterAll(async () => {
    await mongoose.connection.close();
});
describe("user tests", () => {
    test("Test Get All reviews", async () => {
        const response = await request(app).get("/reviews");
        expect(response.statusCode).toBe(200);
    });
});