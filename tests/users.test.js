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
        test("Test Get All users with empty DB",async () => {
            const response = await request(app).get("/user");
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual([]);
        });
    });
    test("Test post User ",async()=>{
        const response= await request(app).post("/user").send({
            name:"dorin cohens",
            _id:"1234567899",
            email:"277dorin122@gmail.com"
        });
        expect(response.statusCode).toBe(200);
      
    });
    test("Get users with one user in the DB",async()=>{
        const response=await request(app).get("/user");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        const user=response.body[0];
        expect(user.name).toBe("dorin cohens");
        expect(user._id).toBe("1234567899");
        expect(user.email).toBe("277dorin122@gmail.com");

    });
    test("put user with id",async()=>{
        const response= await request(app).put("/user/1234567899").send({
            name: "dorin cohens",
            email: "27dorin122@gmail.com",
            _id:"1234567899"
        });
        expect(response.statusCode).toBe(200);
    });
    test("delete user with id",async()=>{
        const response= await request(app).delete("/user/1234567899")
        expect(response.statusCode).toBe(200);
    });
