
import initApp from "../app";
import request from "supertest";
import mongoose from "mongoose";
import { Application } from "express";

const User= require("../models/user_model")
let app: Application;

beforeAll(async () => {
    app = await initApp();
    console.log("beforeAll testFile");
});

afterAll(async () => {
    await mongoose.connection.close();
});

 describe("user tests", () => {
        test("Test Get All users ",async () => {
            const response = await request(app).get("/user");
            expect(response.statusCode).toBe(200);
            
        });
    });
    test("Test post User ",async()=>{
        const response= await request(app).post("/user").send({
            name: "Dorin Cohen",
            email: "dorin1300@gmail.com",
            password:"12345678",
            age: 18,
        });
        expect(response.statusCode).toBe(200);
      
    });
    test("Get users by id  the DB", async () => {
        const response = await request(app).get("/user/65bb69dd74efe402ed6be7a7");
        console.log(response.body); // Log the response body
        expect(response.statusCode).toBe(200);
        const user = response.body;
        expect(user.name).toBe("Dorin Cohen");
        expect(user.email).toBe("dorin1300@gmail.com");
        expect(user.password).toBe("12345678");
        expect(user.age).toBe(18);
    });
    
    test("put user with id",async()=>{ //Tests an edge case of inserting a name that is not just made up of characters
        const response= await request(app).put("/user/65bb69dd74efe402ed6be7a7").send({
            name: "Dorin Cohen3",
            email: "dorin1@gmail.com",
            password:"12345678",
            age: 19,
        });
        expect(response.statusCode).toBe(400);
    });
    test("put user with id",async()=>{ //Tests an edge case of inserting a email that it doesnt email
        const response= await request(app).put("/user/65bb69dd74efe402ed6be7a7").send({
            name: "Dorin Cohen",
            email: "dorin1gmail.com",
            password:"12345678",
            age: 19,
        });
        expect(response.statusCode).toBe(400);
    });
    test("put user with id",async()=>{ //Tests an edge case of inserting a password that it doesnt 6 Characters
        const response= await request(app).put("/user/65bb69dd74efe402ed6be7a7").send({
            name: "Dorin Cohen",
            email: "dorin1gmail.com",
            password:"123",
            age: 19,
        });
        expect(response.statusCode).toBe(400);
    });
    test("put user with id",async()=>{ //Tests an edge case of inserting a age that it up then 120
        const response= await request(app).put("/user/65bb69dd74efe402ed6be7a7").send({
            name: "Dorin Cohen",
            email: "dorin1gmail.com",
            password:"123",
            age: 180,
        });
        expect(response.statusCode).toBe(400);
    });
    
    
    test("delete user with id",async()=>{
        const response= await request(app).delete("/user/65bb6fe87e907bb5c0cdbfbe")
        expect(response.statusCode).toBe(200);
    });
    
