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
const user_model_1 = __importDefault(require("../models/user_model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let app;
let createdUserId;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, app_1.default)();
    console.log("beforeAll testAuth");
    const userResponse = yield (0, supertest_1.default)(app)
        .post("/auth/register")
        .send({
        name: "John Doe",
        email: "john@example.com",
        password: "12345678",
        age: 25,
    });
    createdUserId = userResponse.body._id;
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.default.findByIdAndDelete(createdUserId);
    yield mongoose_1.default.connection.close();
}));
test("Register user with duplicate email", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app)
        .post("/auth/register")
        .send({
        name: "Duplicate User",
        email: "john@example.com", // Use the same email as in the previous test
        password: "12345678",
        age: 30,
    });
    expect(response.statusCode).toBe(406); // Assuming you return 406 for duplicate registration
}));
test("Register user with invalid name", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app)
        .post("/auth/register")
        .send({
        name: "123 Invalid Name",
        email: "invalid@example.com",
        password: "12345678",
        age: 40,
    });
    expect(response.statusCode).toBe(400);
}));
test("Register user with invalid email", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app)
        .post("/auth/register")
        .send({
        name: "Invalid Email",
        email: "invalidemail", // Invalid email format
        password: "12345678",
        age: 50,
    });
    expect(response.statusCode).toBe(400);
}));
test("Register user with invalid age", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app)
        .post("/auth/register")
        .send({
        name: "Invalid Age",
        email: "age@example.com",
        password: "12345678",
        age: 150, // Age out of range
    });
    expect(response.statusCode).toBe(400);
}));
test("Register user with invalid password", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app)
        .post("/auth/register")
        .send({
        name: "Invalid Password",
        email: "password@example.com",
        password: "123", // Password less than 6 characters
        age: 30,
    });
    expect(response.statusCode).toBe(400);
}));
test("Login user with valid credentials", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app)
        .post("/auth/login")
        .send({
        email: "john@example.com",
        password: "12345678",
    });
    expect(response.statusCode).toBe(200);
}));
test("Login user with invalid credentials", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app)
        .post("/auth/login")
        .send({
        email: "invalid@example.com",
        password: "invalidpassword",
    });
    expect(response.statusCode).toBe(406);
}));
test("Login user with uncorrected credentials", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app)
        .post("/auth/login")
        .send({
        email: "john@example.com",
        password: "11111111",
    });
    expect(response.statusCode).toBe(401);
}));
test("Refresh token with valid refresh token", () => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWI1NTU2ZjRhZTA2NmQ4NDkwOGQ4NTQiLCJpYXQiOjE3MDYzODI3MDN9.L21YJj-Oa2n7iEMl4nScuVFS8Ww5DGSVory-PvkwE9w"; // Replace with the actual refresh token
    const response = yield (0, supertest_1.default)(app)
        .post("/auth/refreshToken")
        .set("Authorization", `Bearer ${refreshToken}`);
    console.log(response.status); // Log the status code
    console.log(response.body); // Log the response body
    expect(response.statusCode).toBe(403);
}));
test("Refresh token with invalid refresh token", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app)
        .post("/auth/refreshToken");
    expect(response.statusCode).toBe(401);
}));
test("Logout user with valid credentials", () => __awaiter(void 0, void 0, void 0, function* () {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWJhMzBjOGU2NDE1YWFlNWIzZjc2YjQiLCJpYXQiOjE3MDY3MDEwMjh9.xyKWKiygyRaRzzWaySk_v1PDuhWj5TQEQffyStIOKZU";
    const response = yield (0, supertest_1.default)(app)
        .post("/auth/logout")
        .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(403);
}));
test("Logout user without valid token", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app)
        .post("/auth/logout");
    expect(response.statusCode).toBe(401);
}));
test("Google Sign-In with valid credentials", () => __awaiter(void 0, void 0, void 0, function* () {
    // You need to replace the credential with a valid one for testing
    const credential = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg1ZTU1MTA3NDY2YjdlMjk4MzYxOTljNThjNzU4MWY1YjkyM2JlNDQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2MjcyMTk3NDM1MjEtOWIwN2dpczJvZmFkaTRuYmoyM3N2MjRlcGUxazVvMjkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2MjcyMTk3NDM1MjEtOWIwN2dpczJvZmFkaTRuYmoyM3N2MjRlcGUxazVvMjkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDMwMjc5ODM0MjgwNTg3NDA4NzMiLCJlbWFpbCI6IjI3ZG9yaW4xMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmJmIjoxNzA2ODc4Mjk5LCJuYW1lIjoi15PXldeo15nXnyDXm9eU158iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jS0F5Z3l5bWFYa1dFdHNiMlRPcm9oUTJUUVNEUkQzZWpERHh4R3F6a3o1dVA4PXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IteT15XXqNeZ158iLCJmYW1pbHlfbmFtZSI6Iteb15TXnyIsImxvY2FsZSI6ImhlIiwiaWF0IjoxNzA2ODc4NTk5LCJleHAiOjE3MDY4ODIxOTksImp0aSI6IjNlMWVjNmQxY2ZjOTJjZjY4NzdjNmVkMDQ2ODljODliNmNkMmMwYTIifQ.XfWX1c80poEsLbJ5aYv2d-navu9rVi84nsXkRiTCKO5YcsKHEDX8j9WH2LuRE3o7w79mKewD3-6yzBIeeZZeb8i9UbaTHu3S2NcdCrqZrX_R9H5e9Z8z3gTxAhTu1s81_MqHmPfDHrk8ClIf_NeGZlJEUKIgptNy4eZCtPdu7epvLts7djuizDHkM7ROhxuT7e7N8CMrVOnwrRuW0lYmYUTT15sN8JDIVqzfaoKjg51dMYOAtGQF0aBRqVrGBxDbzNG0n5-oRwp7YjQB0TxQbV4H7mNUoB3pO2bXP3jXxLTtIzT0YzJ3zr8_Y36OzoCLCOLdtI9cboH1z5XjLnC1vw";
    const response = yield (0, supertest_1.default)(app)
        .post("/auth/google")
        .send({ credential });
    console.log(response.body);
    expect(response.statusCode).toBe(200);
}));
test("Google Sign-In with invalid credentials", () => __awaiter(void 0, void 0, void 0, function* () {
    // You need to replace the invalid credential for testing
    const invalidCredential = "invalid_google_credential";
    const response = yield (0, supertest_1.default)(app)
        .post("/auth/google")
        .send({ credential: invalidCredential });
    expect(response.statusCode).toBe(400);
}));
test("Register user with valid credentials", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app)
        .post("/auth/register")
        .send({
        name: "Valid User",
        email: "validuser@example.com",
        password: "password123",
        age: 28,
    });
    expect(response.statusCode).toBe(201);
}));
test("Login user with valid credentials and check returned data", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app)
        .post("/auth/login")
        .send({
        email: "validuser@example.com",
        password: "password123",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.accessToken).toBeDefined();
    expect(response.body.refreshToken).toBeDefined();
    expect(response.body.user).toBeDefined();
    expect(response.body.user.email).toBe("validuser@example.com");
}));
test("Attempt to register with an existing email", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app)
        .post("/auth/register")
        .send({
        name: "Existing User",
        email: "validuser@example.com", // Use the email from the previous test
        password: "password456",
        age: 30,
    });
    expect(response.statusCode).toBe(406);
}));
test("Google Sign-In for an existing user", () => __awaiter(void 0, void 0, void 0, function* () {
    // Use the Google credential for the user created in the first Google Sign-In test
    const credential = "valid_google_credential";
    const response = yield (0, supertest_1.default)(app)
        .post("/auth/google")
        .send({ credential });
    expect(response.statusCode).toBe(200);
    expect(response.body.accessToken).toBeDefined();
    expect(response.body.refreshToken).toBeDefined();
    expect(response.body.user).toBeDefined();
    expect(response.body.user.email).toBe("validuser@example.com");
}));
test("Refresh token with expired refresh token", () => __awaiter(void 0, void 0, void 0, function* () {
    // Manually create an expired refresh token for the user
    const expiredRefreshToken = jsonwebtoken_1.default.sign({ _id: createdUserId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1ms' });
    const response = yield (0, supertest_1.default)(app)
        .post("/auth/refreshToken")
        .set("Authorization", `Bearer ${expiredRefreshToken}`);
    expect(response.statusCode).toBe(403);
}));
test("Logout user with a valid token", () => __awaiter(void 0, void 0, void 0, function* () {
    // Use the refresh token from the first Google Sign-In test
    const refreshToken = "valid_refresh_token";
    const response = yield (0, supertest_1.default)(app)
        .post("/auth/logout")
        .set("Authorization", `Bearer ${refreshToken}`);
    expect(response.statusCode).toBe(200);
}));
test("Logout user with an invalid token", () => __awaiter(void 0, void 0, void 0, function* () {
    const invalidToken = "invalid_refresh_token";
    const response = yield (0, supertest_1.default)(app)
        .post("/auth/logout")
        .set("Authorization", `Bearer ${invalidToken}`);
    expect(response.statusCode).toBe(403);
}));
//# sourceMappingURL=auth.test.js.map