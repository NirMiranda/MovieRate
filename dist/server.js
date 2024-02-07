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
const app_1 = __importDefault(require("./app"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const socket_io_1 = require("socket.io"); // Import Server from socket.io
const socket_1 = require("./socket");
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const app = yield (0, app_1.default)();
        const options = {
            definition: {
                openapi: '3.0.0',
                info: {
                    title: 'Moview 2024 REST API',
                    version: '1.0.0',
                    description: 'REST server including authentication using JWT',
                },
                servers: [{ url: 'http://localhost:3003' }],
            },
            apis: ['./routes/*.ts'],
        };
        const specs = (0, swagger_jsdoc_1.default)(options);
        app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
        const port = process.env.PORT;
        const options2 = {
            key: fs_1.default.readFileSync('client-key.pem'),
            cert: fs_1.default.readFileSync('client-cert.pem')
        };
        const server = https_1.default.createServer(options2, app);
        const io = new socket_io_1.Server(server); // Initialize Socket.io server
        (0, socket_1.handleClient)(io);
        server.listen(port, () => {
            console.log(`MovieRate APP is listening on port ${port}!`);
        });
    }
    catch (error) {
        console.error('Error starting server:', error);
    }
});
startServer();
//# sourceMappingURL=server.js.map