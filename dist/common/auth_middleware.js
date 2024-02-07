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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send({ error: 'Unauthorized' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET);
        req.userId = decoded.userId; // Use type assertion to avoid TypeScript error
        console.log(req.userId);
        next();
    }
    catch (error) {
        res.status(401).send({ error: 'Unauthorized' });
    }
});
exports.default = authMiddleware;
//# sourceMappingURL=auth_middleware.js.map