const request= require("supertest");
const app= require("../app");
const mongoose = require('mongoose');

beforeAll((done) => {
    done();
    });
    afterAll(async () => {
        await mongoose.connection.close();
    });
    describe("user tests", () => {
        test("Test Get All users",async () => {
            const response = await request(app).get("/user");
            expect(response.statusCode).toBe(200);
        });
    });