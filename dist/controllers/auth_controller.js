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
const user_model_1 = __importDefault(require("../models/user_model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validation_1 = __importDefault(require("../models/validation"));
const google_auth_library_1 = require("google-auth-library");
const client = new google_auth_library_1.OAuth2Client();
const genertToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = yield jsonwebtoken_1.default.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    const refreshToken = yield jsonwebtoken_1.default.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET);
    if (user.tokens == null)
        user.tokens = [refreshToken];
    else
        user.tokens.push(refreshToken);
    yield user.save();
    return {
        'accessToken': accessToken,
        'refreshToken': refreshToken,
    };
});
const googleSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticket = yield client.verifyIdToken({
            idToken: req.body.credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const email = payload === null || payload === void 0 ? void 0 : payload.email;
        if (email != null) {
            let user = yield user_model_1.default.findOne({ 'email': email });
            if (user == null) {
                user = yield user_model_1.default.create({
                    'name': payload === null || payload === void 0 ? void 0 : payload.name,
                    'email': email,
                    'password': "12345678",
                    'photo': payload === null || payload === void 0 ? void 0 : payload.picture,
                    'age': 6,
                });
            }
            const response = yield genertToken(user);
            res.status(200).send(Object.assign({ user }, response));
        }
    }
    catch (error) {
        return res.status(400).json(error.message);
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(400).send("Missing email OR password");
    }
    try {
        yield validation_1.default.validateAsync({ email, password });
        const user = yield user_model_1.default.findOne({ 'email': email }).populate({
            path: 'reviews',
            model: 'Review', // Use the model name you defined for the review model
        });
        if (user == null) {
            return res.status(406).send("Email does not exist");
        }
        const match = yield bcryptjs_1.default.compare(password, user.password);
        if (!match) {
            return res.status(401).send("Email or password incorrect");
        }
        const accessToken = yield jsonwebtoken_1.default.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
        const refreshToken = yield jsonwebtoken_1.default.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET);
        if (user.tokens == null)
            user.tokens = [refreshToken];
        else
            user.tokens.push(refreshToken);
        yield user.save();
        res.status(200).send({ 'accessToken': accessToken, 'refreshToken': refreshToken, 'user': user });
    }
    catch (error) {
        if (error.isJoi) {
            const errorMessage = error.details[0].message;
            res.status(400).json({ error: errorMessage });
        }
        else
            return res.status(400).send(`Error: ${error.message}`);
    }
});
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const age = req.body.age;
    const fileUrl = req.body.fileUrl;
    if (!email || !password || !age || !name) {
        return res.status(400).json({ error: "Missing email, password, age, or name" });
    }
    try {
        yield validation_1.default.validateAsync({ name, email, password, age });
        if (!isValidString(name)) {
            return res.status(400).json({ error: "Invalid full name. Please enter only letters." });
        }
        const response = yield user_model_1.default.findOne({ 'email': email });
        if (response != null) {
            return res.status(406).json({ error: "Email is already registered" });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const encryptedPassword = yield bcryptjs_1.default.hash(password, salt);
        const response2 = yield user_model_1.default.create({ 'name': name, 'email': email, 'password': encryptedPassword, 'age': age, 'photo': fileUrl });
        return res.status(201).json(response2);
    }
    catch (error) {
        if (error.isJoi === true) {
            const errorMessage = error.details[0].message;
            return res.status(400).json({ error: errorMessage });
        }
        else {
            return res.status(400).json({ error: `Error: ${error.message}` });
        }
    }
});
// Function to check if a given value is a valid string only letters)
const isValidString = (value) => /^[a-zA-Z\s]+$/.test(value);
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    }
    const userInfo = jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET);
    if (userInfo == null) {
        return res.status(403).send('Invalid request0');
    }
    const userId = userInfo._id;
    console.log("the userID is:", userId);
    try {
        const user = yield user_model_1.default.findById(userId);
        if (user == null) {
            return res.status(403).send('Invalid request1');
        }
        if (!user.tokens.includes(token)) {
            user.tokens = [];
            yield user.save();
            return res.status(403).send('Invalid request2');
        }
        user.tokens.splice(user.tokens.indexOf(token), 1);
        yield user.save();
        res.status(200).send('Logout successful RefreshToken in delete');
    }
    catch (err) {
        res.status(403).send('Invalid request3');
    }
});
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeaders = req.headers['authorization'];
    const token = authHeaders && authHeaders.split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET);
        if (!decoded) {
            return res.status(403).send('Invalid token');
        }
        const userId = decoded._id;
        const user = yield user_model_1.default.findById(userId).populate({
            path: 'reviews',
            model: 'Review',
        }).exec();
        if (!user || !user.tokens.includes(token)) {
            return res.status(403).send('Invalid request');
        }
        const accessToken = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
        const refreshToken = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET);
        user.tokens[user.tokens.indexOf(token)] = refreshToken;
        yield user.save();
        res.status(200).json({ accessToken, refreshToken });
    }
    catch (error) {
        res.status(403).send(error.message);
    }
});
exports.default = { logout, register, login, refreshToken, googleSignIn };
//# sourceMappingURL=auth_controller.js.map