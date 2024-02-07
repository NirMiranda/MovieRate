"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const Movie = require("../models/movie_model");
let app;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, app_1.default)();
    console.log("beforeAll testFile");
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
describe("movie tests", () => {
    test("Test Get All movies", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/movie/getAllMovies");
        expect(response.statusCode).toBe(200);
        // console.log(response.body);
    }));
    test("Test Get movie by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const existingMovieId = "65bbb9f9abdb026b311c0830";
        const response = yield (0, supertest_1.default)(app).get(`/movie/getMovieById/${existingMovieId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(existingMovieId);
    }));
    test("Test POST Movie", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/movie/postMovie").send({
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
    }));
    test("Test PUT movie UPDATE name", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).put("/movie/updateMovie").send(Object.assign(Object.assign({}, Movie), { movieName: "Update Movie name" }));
        expect(response.statusCode).toBe(200);
    }));
    test("Test PUT movie UPDATE genre", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).put("/movie/updateMovie").send(Object.assign(Object.assign({}, Movie), { genre: "Update" }));
        expect(response.statusCode).toBe(200);
    }));
    test("Test PUT movie UPDATE year", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).put("/movie/updateMovie").send(Object.assign(Object.assign({}, Movie), { year: 1999 }));
        expect(response.statusCode).toBe(200);
    }));
    test("Test PUT movie UPDATE actors", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).put("/movie/updateMovie").send(Object.assign(Object.assign({}, Movie), { actors: ["Update 1", "Update 2"] }));
        expect(response.statusCode).toBe(200);
    }));
    test("Test PUT movie UPDATE director", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).put("/movie/updateMovie").send(Object.assign(Object.assign({}, Movie), { director: "Update Director" }));
        expect(response.statusCode).toBe(200);
    }));
    test("Test PUT movie UPDATE image", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).put("/movie/updateMovie").send(Object.assign(Object.assign({}, Movie), { image: "Update-image.jpg" }));
        expect(response.statusCode).toBe(200);
    }));
    test("Test PUT movie UPDATE description", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).put("/movie/updateMovie").send(Object.assign(Object.assign({}, Movie), { description: "This is new Update Description" }));
        expect(response.statusCode).toBe(200);
    }));
    test("Test PUT movie UPDATE reviews", () => __awaiter(void 0, void 0, void 0, function* () {
        let review;
        const response = yield (0, supertest_1.default)(app).put("/movie/updateMovie").send(Object.assign(Object.assign({}, Movie), { reviews: review }));
        expect(response.statusCode).toBe(200);
    }));
    // remove the comment of the delete test to check test
    test("Test delete movie by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/movie/postMovie").send({
            movieName: "New Movie test to delete",
            director: "Director",
            year: 1948,
            actors: ["Actor 1", "Actor 2"],
            genre: "Action",
            image: "new-movie-test.jpg",
            description: "Description of the new movie test",
            reviews: [],
            trailer: "https://www.youtube.com/watch?v=trailer-id",
            uploadedBy: "65ba36489abcec58ab875ee0",
        });
        expect(response.statusCode).toBe(200);
        const response1 = yield (0, supertest_1.default)(app).delete("/movie/deleteMovieById/65ba36489abcec58ab875ee0");
        expect(response1.statusCode).toBe(404);
    }));
});
//# sourceMappingURL=movies.test.js.map