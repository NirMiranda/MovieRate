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
const mongoose_2 = require("mongoose");
const { ObjectId } = mongoose_2.Types;
const User = require("../models/user_model");
let app;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, app_1.default)();
    console.log("beforeAll testFile");
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
describe("user tests", () => {
    test("Test Get All users ", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/user");
        expect(response.statusCode).toBe(200);
    }));
    test("Test Get All users with name", () => __awaiter(void 0, void 0, void 0, function* () {
        const userName = "Nir Miranda";
        const response = yield (0, supertest_1.default)(app).get(`/user?name=${encodeURIComponent(userName)}`);
        expect(response.statusCode).toBe(200);
    }));
    test("Test post User ", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/user").send({
            name: "Dorin Cohen",
            email: "dorin1300@gmail.com",
            password: "12345678",
            age: 18,
        });
        expect(response.statusCode).toBe(200);
    }));
    test("Get users by id  the DB", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/user/65bdd5bc427047256567d1b6");
        expect(response.statusCode).toBe(200);
        const user = response.body;
        expect(user.name).toBe("Dorin Cohen");
        expect(user.email).toBe("dorin1300@gmail.com");
        expect(user.password).toBe("12345678");
        expect(user.age).toBe(18);
    }));
    test("put user with id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).put("/user/65bdd5bc427047256567d1b6").send({
            name: "Dorin Cohen3",
            email: "dorin1@gmail.com",
            password: "12345678",
            age: 19,
        });
        expect(response.statusCode).toBe(400);
    }));
    test("put user with id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).put("/user/65bdd5bc427047256567d1b6").send({
            name: "Dorin Cohen",
            email: "dorin1gmail.com",
            password: "12345678",
            age: 19,
        });
        expect(response.statusCode).toBe(400);
    }));
    test("put user with id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).put("/user/65bdd5bc427047256567d1b6").send({
            name: "Dorin Cohen",
            email: "dorin1gmail.com",
            password: "123",
            age: 19,
        });
        expect(response.statusCode).toBe(400);
    }));
    test("put user with id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).put("/user/65bdd5bc427047256567d1b6").send({
            name: "Dorin Cohen",
            email: "dorin1gmail.com",
            password: "123",
            age: 180,
        });
        expect(response.statusCode).toBe(400);
    }));
    test("delete user with id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/user").send({
            name: "Dorina co",
            email: "ilay1200@gmail.com",
            password: "123456789",
            age: 27,
        });
        const user_id = response.body._id;
        expect(response.statusCode).toBe(200);
        const response1 = yield (0, supertest_1.default)(app).get("/user");
        expect(response1.statusCode).toBe(200);
        const response2 = yield (0, supertest_1.default)(app).delete(`/user/${user_id}`);
        expect(response2.statusCode).toBe(200);
    }));
    test("Get movies by user ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const response2 = yield (0, supertest_1.default)(app).post("/user").send({
            name: "Dorina co",
            email: "ilay1200@gmail.com",
            password: "123456789",
            age: 27,
        });
        const user_id = response2.body._id;
        const response = yield (0, supertest_1.default)(app).get(`/user/getMoviesByUserId/${user_id}`);
        expect(response.statusCode).toBe(200);
    }));
    test("Get movies by uncorrect user ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = "65bbc24c177507ce1d8eca";
        const response = yield (0, supertest_1.default)(app).get(`/user/getMoviesByUserId/${userId}`);
        expect(response.statusCode).toBe(500);
    }));
    test("Get user by token with valid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWI1NTU2ZjRhZTA2NmQ4NDkwOGQ4NTQiLCJpYXQiOjE3MDY4Njg3NjB9._fyw7ZaUgzajPF--YL3IiHtvAEzEzQsWBMhpSEl9Iys";
        const response = yield (0, supertest_1.default)(app)
            .get("/user/token")
            .set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    }));
    test("Get user by token with invalid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .get("/user/token")
            .set("Authorization", "1234");
        expect(response.statusCode).toBe(401);
    }));
});
//# sourceMappingURL=users.test.js.map