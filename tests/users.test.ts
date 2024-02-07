import initApp from "../app";
import request from "supertest";
import mongoose from "mongoose";
import { Application } from "express";
import { Types } from "mongoose";
const { ObjectId } = Types;

const User = require("../models/user_model")
let app: Application;

beforeAll(async () => {
    app = await initApp();
    console.log("beforeAll testFile");
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("user tests", () => {
    test("Test Get All users ", async () => {
        const response = await request(app).get("/user");
        expect(response.statusCode).toBe(200);

    });
    test("Test Get All users with name", async () => {
        const userName = "Nir Miranda";
        const response = await request(app).get(`/user?name=${encodeURIComponent(userName)}`);
        expect(response.statusCode).toBe(200);
    });
    
    

    test("Test post User ", async () => {
        const response = await request(app).post("/user").send({
            name: "Dorin Cohen",
            email: "dorin1300@gmail.com",
            password: "12345678",
            age: 18,
        });
        expect(response.statusCode).toBe(200);

    });
    test("Get users by id  the DB", async () => {
        const response = await request(app).get("/user/65bdd5bc427047256567d1b6");
        expect(response.statusCode).toBe(200);
        const user = response.body;
        expect(user.name).toBe("Dorin Cohen");
        expect(user.email).toBe("dorin1300@gmail.com");
        expect(user.password).toBe("12345678");
        expect(user.age).toBe(18);
    });
    

    test("put user with id", async () => { //Tests an edge case of inserting a name that is not just made up of characters
        const response = await request(app).put("/user/65bdd5bc427047256567d1b6").send({
            name: "Dorin Cohen3",
            email: "dorin1@gmail.com",
            password: "12345678",
            age: 19,
        });
        expect(response.statusCode).toBe(400);
    });
    test("put user with id", async () => { //Tests an edge case of inserting a email that it doesnt email
        const response = await request(app).put("/user/65bdd5bc427047256567d1b6").send({
            name: "Dorin Cohen",
            email: "dorin1gmail.com",
            password: "12345678",
            age: 19,
        });
        expect(response.statusCode).toBe(400);
    });
    test("put user with id", async () => { //Tests an edge case of inserting a password that it doesnt 6 Characters
        const response = await request(app).put("/user/65bdd5bc427047256567d1b6").send({
            name: "Dorin Cohen",
            email: "dorin1gmail.com",
            password: "123",
            age: 19,
        });
        expect(response.statusCode).toBe(400);
    });
    test("put user with id", async () => { //Tests an edge case of inserting a age that it up then 120
        const response = await request(app).put("/user/65bdd5bc427047256567d1b6").send({
            name: "Dorin Cohen",
            email: "dorin1gmail.com",
            password: "123",
            age: 180,
        });
        expect(response.statusCode).toBe(400);
    });
    test("delete user with id", async () => {
        const response = await request(app).post("/user").send({
            name: "Dorina co",
            email: "ilay1200@gmail.com",
            password: "123456789",
            age: 27,
        });
        const user_id = response.body._id;
        expect(response.statusCode).toBe(200);
        const response1 = await request(app).get("/user");
        expect(response1.statusCode).toBe(200);
        const response2 = await request(app).delete(`/user/${user_id}`);
        expect(response2.statusCode).toBe(200);
    });
   
    test("Get movies by user ID", async () => {
        const response2= await request(app).post("/user").send({
            name: "Dorina co",
            email: "ilay1200@gmail.com",
            password: "123456789",
            age: 27,
        });
        const user_id = response2.body._id;
        const response = await request(app).get(`/user/getMoviesByUserId/${user_id}`);
        expect(response.statusCode).toBe(200);
    });

    test("Get movies by uncorrect user ID", async () => {
        const userId = "65bbc24c177507ce1d8eca"; 
        const response = await request(app).get(`/user/getMoviesByUserId/${userId}`);
        expect(response.statusCode).toBe(500);
    });

    test("Get user by token with valid token", async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWI1NTU2ZjRhZTA2NmQ4NDkwOGQ4NTQiLCJpYXQiOjE3MDY4Njg3NjB9._fyw7ZaUgzajPF--YL3IiHtvAEzEzQsWBMhpSEl9Iys";
        const response = await request(app)
            .get("/user/token")
            .set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    });
    
    test("Get user by token with invalid token", async () => {
        const response = await request(app)
            .get("/user/token")
            .set("Authorization", "1234");
        expect(response.statusCode).toBe(401);
    });
    
    
});