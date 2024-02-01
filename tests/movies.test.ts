import initApp from "../app";
import request from "supertest";
import mongoose from "mongoose";
import { Application } from "express";
import Movies, { movieType } from "../models/movie_model";
import { object } from "joi";


const Movie = require("../models/movie_model")
let app: Application;

beforeAll(async () => {
    app = await initApp();
    console.log("beforeAll testFile");
});
afterAll(async () => {
    await mongoose.connection.close();
});

describe("movie tests", () => {

    test("Test Get All movies", async () => {
        const response = await request(app).get("/movie/getAllMovies");
        expect(response.statusCode).toBe(200);
        console.log(response.body);
    });

    test("Test Get movie by id", async () => {
        const existingMovieId = "65bbb9f9abdb026b311c0830";
        const response = await request(app).get(`/movie/getMovieById/${existingMovieId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(existingMovieId);
    });
    test("Test POST Movie", async () => {
        const response = await request(app).post("/movie/postMovie").send({
            movieName: "New Movie test",
            director: "Director",
            year: 1948,
            actors: ["Actor 1", "Actor 2"],
            genre: "Action",
            image: "new-movie-test.jpg",
            description: "Description of the new movie test",
            reviews: [],
            trailer: "https://www.youtube.com/watch?v=trailer-id",
        });
        expect(response.statusCode).toBe(200);
    });

    test("Test PUT movie UPDATE name", async () => {
        const response = await request(app).put("/movie/updateMovie").send({ ...Movie, movieName: "Update Movie name", });
        expect(response.statusCode).toBe(200);
    });

    test("Test PUT movie UPDATE genre", async () => {
        const response = await request(app).put("/movie/updateMovie").send({ ...Movie, genre: "Update", });
        expect(response.statusCode).toBe(200);
    });

    test("Test PUT movie UPDATE year", async () => {
        const response = await request(app).put("/movie/updateMovie").send({ ...Movie, year: 1999, });
        expect(response.statusCode).toBe(200);
    });

    test("Test PUT movie UPDATE actors", async () => {
        const response = await request(app).put("/movie/updateMovie").send({ ...Movie, actors: ["Update 1", "Update 2"], });
        expect(response.statusCode).toBe(200);
    });

    test("Test PUT movie UPDATE director", async () => {
        const response = await request(app).put("/movie/updateMovie").send({ ...Movie, director: "Update Director", });
        expect(response.statusCode).toBe(200);
    });

    test("Test PUT movie UPDATE image", async () => {
        const response = await request(app).put("/movie/updateMovie").send({ ...Movie, image: "Update-image.jpg", });
        expect(response.statusCode).toBe(200);
    });

    test("Test PUT movie UPDATE description", async () => {
        const response = await request(app).put("/movie/updateMovie").send({ ...Movie, description: "This is new Update Description", });
        expect(response.statusCode).toBe(200);
    });

    test("Test PUT movie UPDATE reviews", async () => {
        let review: {
            date: "27.12.98",
            reviewerId: mongoose.Schema.Types.ObjectId,
            movieId: mongoose.Schema.Types.ObjectId,
            rating: 5,
            likes?: 10,
            image: "review.jpg",
            text: "Hi this is a review",
        };
        const response = await request(app).put("/movie/updateMovie").send({ ...Movie, reviews: review, });
        expect(response.statusCode).toBe(200);
    });


    // remove the comment of the delete test to check if the delete works
    // test("Test delete movie by id", async () => {
    //     const response = await request(app).delete("/movie/deleteMovieById/65bbb8a57bbdb4f008ab279c")
    //     expect(response.statusCode).toBe(200);
    // });
});

