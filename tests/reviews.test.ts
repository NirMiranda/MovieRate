import initApp from "../app";
import request from "supertest";
import mongoose from "mongoose";
import { Application } from "express";


const Review = require("../models/review_model")
let app: Application;

beforeAll(async () => {
    app = await initApp();
    console.log("beforeAll testFile");
});
afterAll(async () => {
    await mongoose.connection.close();
});

describe("review tests", () => {

    test("Test Get All reviews", async () => {
        const response = await request(app).get("/review/getAllReviews");
        expect(response.statusCode).toBe(200);
    });

    test("Test Get Review by id", async () => {
        const existingReviewId = "65bbb0fc9ee718cd239fb088";
        const response = await request(app).get(`/review/getReviewById/${existingReviewId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(existingReviewId);
    });
    test("Test POST Review", async () => {
        const response = await request(app).post("/review/addReview").send({
            date: '2024-02-01T14:55:56.044Z',
            reviewerId: '65ba36489abcec58ab875ee0',
            movieId: '65ba74775bc238b08fd4e362',
            rating: 5,
            likes: 0,
            image: 'ilay.png',
            text: 'hii',
        });
        expect(response.statusCode).toBe(200);
    });
    test("Test PUT review UPDATE date", async () => {
        const response = await request(app).put("/review/updateReview").send({ ...Review, date: '2023-09-01T14:55:56.044Z', });
        expect(response.statusCode).toBe(200);
    });
    test("Test PUT review UPDATE rating", async () => {
        const response = await request(app).put("/review/updateReview").send({
            ...Review, rating: 7,
        });
        expect(response.statusCode).toBe(200);
    });
    test("Test PUT review UPDATE image", async () => {
        const response = await request(app).put("/review/updateReview").send({ ...Review, image: "update.png", });
        expect(response.statusCode).toBe(200);
    });
    test("Test PUT review UPDATE likes", async () => {
        const response = await request(app).put("/review/updateReview").send({ ...Review, likes: 20, });
        expect(response.statusCode).toBe(200);
    });
    test("Test PUT review UPDATE text", async () => {
        const response = await request(app).put("/review/updateReview").send({ ...Review, text: "update comment", });
        expect(response.statusCode).toBe(200);
    });
    // remove the comment of the delete test to check test
    // test("Test delete Review by id", async () => {
    //     const response = await request(app).delete("/review/deleteReview/65bbb0fc9ee718cd239fb088")
    //     expect(response.statusCode).toBe(200);
    // });
});

