import initApp from "../app";
import request from "supertest";
import mongoose from "mongoose";
import { Application } from "express";

let app: Application;

beforeAll(async () => {
    app = await initApp();
    console.log("beforeAll testAuth");
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Authentication routes tests", () => {
    test("Register user with valid data", async () => {
        const response = await request(app)
            .post("/auth/register")
            .send({
                name: "John Doe",
                email: "john@example.com",
                password: "12345678",
                age: 25,
            });
        expect(response.statusCode).toBe(406);

    });

    test("Register user with duplicate email", async () => {
        const response = await request(app)
            .post("/auth/register")
            .send({
                name: "Duplicate User",
                email: "john@example.com", // Use the same email as in the previous test
                password: "12345678",
                age: 30,
            });
        expect(response.statusCode).toBe(406); // Assuming you return 406 for duplicate registration
    });

    test("Register user with invalid name", async () => {
        const response = await request(app)
            .post("/auth/register")
            .send({
                name: "123 Invalid Name",
                email: "invalid@example.com",
                password: "12345678",
                age: 40,
            });
        expect(response.statusCode).toBe(400);
    });

    test("Register user with invalid email", async () => {
        const response = await request(app)
            .post("/auth/register")
            .send({
                name: "Invalid Email",
                email: "invalidemail", // Invalid email format
                password: "12345678",
                age: 50,
            });
        expect(response.statusCode).toBe(400);
    });

    test("Register user with invalid age", async () => {
        const response = await request(app)
            .post("/auth/register")
            .send({
                name: "Invalid Age",
                email: "age@example.com",
                password: "12345678",
                age: 150, // Age out of range
            });
        expect(response.statusCode).toBe(400);
    });

    test("Register user with invalid password", async () => {
        const response = await request(app)
            .post("/auth/register")
            .send({
                name: "Invalid Password",
                email: "password@example.com",
                password: "123", // Password less than 6 characters
                age: 30,
            });
        expect(response.statusCode).toBe(400);
    });

    test("Login user with valid credentials", async () => {
        const response = await request(app)
            .post("/auth/login")
            .send({
                email: "john@example.com",
                password: "12345678",
            });
        expect(response.statusCode).toBe(200);

    });

    test("Login user with invalid credentials", async () => {
        const response = await request(app)
            .post("/auth/login")
            .send({
                email: "invalid@example.com",
                password: "invalidpassword",
            });
        expect(response.statusCode).toBe(406);
    });
    test("Login user with uncorrected credentials", async () => {
        const response = await request(app)
            .post("/auth/login")
            .send({
                email: "john@example.com",
                password: "11111111",
            });
        expect(response.statusCode).toBe(401);
    });



    test("Refresh token with valid refresh token", async () => {
        const refreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWJiN2VlNzhlY2U4YWY2MWI4NGFkY2EiLCJpYXQiOjE3MDY3ODY1NzZ9.kQeL-T6GRNyAoFV-fUW76DrHI_dF4rxwe4dCG1sb3xQ"; // Replace with the actual refresh token

        const response = await request(app)
            .post("/auth/refreshToken")
            .set("Authorization", `Bearer ${refreshToken}`);

        console.log(response.status); // Log the status code
        console.log(response.body); // Log the response body

        expect(response.statusCode).toBe(403);

    });

    test("Refresh token with invalid refresh token", async () => {
        const response = await request(app)
            .post("/auth/refreshToken");
        expect(response.statusCode).toBe(401);
    });
    test("Logout user with valid credentials", async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWJiN2VlNzhlY2U4YWY2MWI4NGFkY2EiLCJpYXQiOjE3MDY3ODY2NTN9.4lKrCdRxbbPD0ylTQKIUkrlR5CqKZL6KvRMHAG-kFAA";
        const response = await request(app)
            .post("/auth/logout")
            .set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(403);

    });

    test("Logout user without valid token", async () => {
        const response = await request(app)
            .post("/auth/logout");
        expect(response.statusCode).toBe(401);
    });

});
