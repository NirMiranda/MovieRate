import initApp from "../app";
import request from "supertest";
import mongoose from "mongoose";
import { Application } from "express";
import Movies, { movieType } from "../models/movie_model";
import { object } from "joi";

const Movie1: movieType = {
    movieName: "New Movie test",
    director: "Director",
    year: 1948,
    actors: ["Actor 1", "Actor 2"],
    genre: "Action",
    image: "new-movie-test.jpg",
    description: "Description of the new movie test ",
    reviews: [],
    trailer: "https://www.youtube.com/watch?v=trailer-id",
    uploadedBy: new ObjectId,
};
const Movie2: movieType = {
    movieName: "Action movie for test",
    director: "Martin Scorsese",
    year: 1948,
    actors: ["Actor 1", "Actor 2"],
    genre: "Action",
    image: "https://m.media-amazon.com/images/M/MV5BMjE4ZTZlNDAtM2Q3YS00YjFhLThjN2UtODg2ZGNlN2E2MWU2XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg",
    description: "When oil is discovered in 1920s Oklahoma under Osage Nation land, the Osage people are murdered one by one - until the FBI steps in to unravel the mystery.",
    reviews: [],
    trailer: "https://www.youtube.com/watch?v=EP34Yoxs3FQ",
    uploadedBy: new ObjectId
};

let app: Application;
beforeAll(async () => {
    app = await initApp();
});
afterAll(async () => {
    await mongoose.connection.close();
});

describe("movie tests", () => {
    test("Test Get All movies", async () => {
        const response = await request(app).get("/movie/getAllMovies");
        expect(response.statusCode).toBe(200);
    });
    test("Test Get 1 movie by genre", async () => {
        const response = await request(app).get("/movie/getAllMovies");
        expect(response.statusCode).toBe(200);
        const movies = response.body;
        const filteredMovies = movies.filter((movie: { genre: string; }) => movie.genre === 'Action');
        const movieExists = filteredMovies.some((movie: any) => {
            return movie.genre === Movie2.genre
        });
        expect(movieExists).toBe(true);
    });
    test("Test Get 2 movie by director", async () => {
        const response = await request(app).get("/movie/getAllMovies");
        expect(response.statusCode).toBe(200);
        const movies = response.body;
        const filteredMovies = movies.filter((movie: { director: string; }) => movie.director === 'Martin Scorsese');
        const movieExists = filteredMovies.some((movie: any) => {
            return movie.director === Movie2.director
        });
        expect(movieExists).toBe(true);
    });
    test("Test Get 3 movie by year ", async () => {
        const response = await request(app).get("/movie/getAllMovies");
        expect(response.statusCode).toBe(200);
        const movies = response.body;
        const filteredMovies = movies.filter((movie: { year: Number; }) => movie.year === 1948);
        const movieExists = filteredMovies.some((movie: any) => {
            return movie.director === Movie2.director
        });
        expect(movieExists).toBe(true);
    });
    test("Test Get 4 movie by id", async () => {
        const existingMovieId = "65bb5ee824169d7e4820215e";
        const response = await request(app).get(`/movie/getMovieById/${existingMovieId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(existingMovieId);
    });
    test("Test Add movie to DB", async () => {
        const response = await request(app).post("/movie/postMovie").send(Movie1);
        expect(response.statusCode).toBe(200);
        expect(response.body.movieName).toBe(Movie1.movieName);
        expect(response.body.director).toBe(Movie1.director);
        expect(response.body.year).toBe(Movie1.year);
        expect(response.body.actors).toStrictEqual(Movie1.actors);
        expect(response.body.genre).toBe(Movie1.genre);
        expect(response.body.description).toBe(Movie1.description);
        expect(response.body.image).toBe(Movie1.image);
        expect(response.body.reviews).toStrictEqual(Movie1.reviews);

    });
    test("Test Get the new movie", async () => {
        const existingMovieId = "65bb75bfe90e3ac9c2b71a02";
        const response = await request(app).get(`/movie/getMovieById/${existingMovieId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(existingMovieId);
    });

    test("Test update movie details", async () => {
        const existingMovieId = "65bb6da58cdd68e95c6e779c";
        const updatedMovieData = {
            _id: existingMovieId,
            movieName: "Update Movie test",
            director: "Update director",
            year: 1948,
            actors: ["Actor Update 1", "Actor 2"],
            genre: "Action",
            image: "update-movie-test.jpg",
            description: "New Update Description of the movie test",
            reviews: [],
            trailer: "https://www.youtube.com/watch?v=trailer-id"
        };
        const updateResponse = await request(app).post(`/movie/updateMovie/${existingMovieId}`).send(updatedMovieData);
        expect(updateResponse.statusCode).toBe(200);
        const getResponse = await request(app).get(`/movie/getMovieById/${existingMovieId}`);
        const updatedMovie = getResponse.body;
        expect(updatedMovie.movieName).toBe(updatedMovieData.movieName);
        expect(updatedMovie.director).toBe(updatedMovieData.director);
        expect(updatedMovie.year).toBe(updatedMovieData.year);
        expect(updatedMovie.genre).toBe(updatedMovieData.genre);
        expect(updatedMovie.image).toBe(updatedMovieData.image);
        expect(updatedMovie.description).toBe(updatedMovieData.description);
        expect(updatedMovie.reviews).toStrictEqual(updatedMovieData.reviews);
        expect(updatedMovie.trailer).toBe(updatedMovieData.trailer);
    });



    test("Test delete movie by id", async () => {
        const createMovieResponse = await request(app)
            .post("/movie/postMovie")
            .send({
                movieName: "Test Movie",
                director: "test director",
                year: 2011,
                actors: ["Actor test 1", "Actor test 2"],
                genre: "Comedy",
                image: "movie-test.jpg",
                description: "Description of the new movie test ",
                reviews: [],
                trailer: "https://www.youtube.com/watch?v=trailer-id"
            });
        const newMovieId = createMovieResponse.body._id;
        const deleteMovieResponse = await request(app).delete(`/movie/deleteMovieById/${newMovieId}`);
        expect(deleteMovieResponse.statusCode).toBe(200);
        const getMovieResponse = await request(app).get(`/movie/getMovieById/${newMovieId}`);
        expect(getMovieResponse.statusCode).toBe(200);
    });
});

// test("Test update 2 movie director ", async () => {
    //     // update movie director that in the db

    //     const response = await request(app).get("/movie/updateMovie");
    //     console.log(response);
    //     expect(response.statusCode).toBe(200);
    // });
    // test("Test update 3 movie year", async () => {
    //     // update movie year that in the db

    //     const response = await request(app).get("/movie/updateMovie");
    //     console.log(response);
    //     expect(response.statusCode).toBe(200);
    // });
    // test("Test update 4 movie actors", async () => {
    //     // update movie actors that in the db

    //     const response = await request(app).get("/movie/updateMovie");
    //     console.log(response);
    //     expect(response.statusCode).toBe(200);
    // });
    // test("Test update 5 movie genre", async () => {
    //     // update movie genre that in the db

    //     const response = await request(app).get("/movie/updateMovie");
    //     console.log(response);
    //     expect(response.statusCode).toBe(200);
    // });
    // test("Test update 6 movie image", async () => {
    //     // update movie image that in the db

    //     const response = await request(app).get("/movie/updateMovie");
    //     console.log(response);
    //     expect(response.statusCode).toBe(200);
    // });
    // test("Test update 7 movie description", async () => {
    //     // update movie description that in the db
    //     const response = await request(app).get("/movie/updateMovie");
    //     console.log(response);
    //     expect(response.statusCode).toBe(200);
    // });
    // test("Test update 8 movie specific review from reviews[]", async () => {
    //     // update movie specific review from reviews[] that in the db
    //     const response = await request(app).get("/movie/updateMovie");
    //     console.log(response);
    //     expect(response.statusCode).toBe(200);
    // });
    // test("Test update 9 movie trailer", async () => {
    //     // update movie specific trailer that in the db
    //     const response = await request(app).get("/movie/updateMovie");
    //     console.log(response);
    //     expect(response.statusCode).toBe(200);
    // });