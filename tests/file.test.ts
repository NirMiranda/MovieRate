import initApp from "../app";
import request from "supertest";
import mongoose from "mongoose";
import { Application } from "express";

let app: Application;

beforeAll(async () => {
    app = await initApp();
    console.log("beforeAll");
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("File Tests", () => {
    test("upload file", async () => {
        const filePath = `${__dirname}/captin.webp`; // Adjust the path here

        try {
            const response = await request(app)
                .post("/file?file=123.webp")
                .attach('file', filePath);

            expect(response.statusCode).toEqual(200);
            let url = response.body.url;
            console.log(url);
            url = url.replace(/^.*\/\/[^/]+/, '');
            const res = await request(app).get(url);
            expect(res.statusCode).toEqual(200);
        } catch (err) {
            console.error(err);
            // Remove or correct the line below
            expect(1).toEqual(2);
        }
    });
});
