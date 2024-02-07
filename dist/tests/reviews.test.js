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
const Review = require("../models/review_model");
let app;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, app_1.default)();
    console.log("beforeAll testFile");
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
describe("review tests", () => {
    test("Test Get All reviews", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/review/getAllReviews");
        expect(response.statusCode).toBe(200);
    }));
    test("Test Get Review by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const existingReviewId = "65bbd4c0f04eb6d2e28fc0ba";
        const response = yield (0, supertest_1.default)(app).get(`/review/getReviewById/${existingReviewId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(existingReviewId);
    }));
    test("Test POST Review", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/review/addReview").send({
            date: '2024-02-01T14:55:56.044Z',
            reviewerId: '65ba36489abcec58ab875ee0',
            movieId: '65ba74775bc238b08fd4e362',
            rating: 5,
            likes: 0,
            image: 'ilay.png',
            text: 'hii',
        });
        expect(response.statusCode).toBe(200);
    }));
    test("Test PUT review UPDATE date", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).put("/review/updateReview").send(Object.assign(Object.assign({}, Review), { date: '2023-09-01T14:55:56.044Z' }));
        expect(response.statusCode).toBe(200);
    }));
    test("Test PUT review UPDATE rating", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).put("/review/updateReview").send(Object.assign(Object.assign({}, Review), { rating: 7 }));
        expect(response.statusCode).toBe(200);
    }));
    test("Test PUT review UPDATE image", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).put("/review/updateReview").send(Object.assign(Object.assign({}, Review), { image: "update.png" }));
        expect(response.statusCode).toBe(200);
    }));
    test("Test PUT review UPDATE likes", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).put("/review/updateReview").send(Object.assign(Object.assign({}, Review), { likes: 20 }));
        expect(response.statusCode).toBe(200);
    }));
    test("Test PUT review UPDATE text", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).put("/review/updateReview").send(Object.assign(Object.assign({}, Review), { text: "update comment" }));
        expect(response.statusCode).toBe(200);
    }));
    test("Test delete Review by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/review/addReview").send({
            date: '2024-02-01T14:55:56.044Z',
            reviewerId: '65ba36489abcec58ab875ee0',
            movieId: '65ba74775bc238b08fd4e362',
            rating: 10,
            likes: 10,
            image: 'delete.png',
            text: 'delete',
        });
        expect(response.statusCode).toBe(200);
        const response1 = yield (0, supertest_1.default)(app).delete("/review/deleteReview/65bbb0fc9ee718cd239fb088");
        expect(response1.statusCode).toBe(200);
    }));
});
//# sourceMappingURL=reviews.test.js.map