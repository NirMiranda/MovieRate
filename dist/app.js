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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user_routes"));
const auth_router_1 = __importDefault(require("./routes/auth_router"));
const movie_routes_1 = __importDefault(require("./routes/movie_routes"));
const review_routes_1 = __importDefault(require("./routes/review_routes"));
const file_router_1 = __importDefault(require("./routes/file_router"));
const initApp = () => {
    const promise = new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const db = mongoose_1.default.connection;
        db.once('open', () => console.log('connected to mongoDB'));
        yield mongoose_1.default.connect(process.env.DATABASE_URL);
        db.on('error', error => { console.error(error); });
        const app = (0, express_1.default)();
        // const HttpServer = http.createServer(app)
        // new ServerSocket(HttpServer);
        app.use((0, cors_1.default)());
        app.use(body_parser_1.default.json());
        app.use(body_parser_1.default.urlencoded({ extended: true }));
        app.use('/user', user_routes_1.default);
        app.use('/auth', auth_router_1.default);
        app.use('/movie', movie_routes_1.default);
        app.use('/review', review_routes_1.default);
        app.use('/file', file_router_1.default);
        app.use('/public', express_1.default.static('public'));
        app.use("/user", user_routes_1.default);
        app.use("/auth", auth_router_1.default);
        app.use("/movie", movie_routes_1.default);
        app.use("/review", review_routes_1.default);
        app.use("/file", file_router_1.default);
        app.use("/public", express_1.default.static("public"));
        resolve(app);
    }));
    return promise;
};
exports.default = initApp;
//# sourceMappingURL=app.js.map