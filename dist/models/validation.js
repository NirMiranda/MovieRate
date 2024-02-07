"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const authSchema = joi_1.default.object({
    name: joi_1.default.string().regex(/^[a-zA-Z\s]+$/),
    email: joi_1.default.string().email().lowercase().required(),
    password: joi_1.default.string().min(6),
    age: joi_1.default.number().min(6).max(120),
});
exports.default = authSchema;
//# sourceMappingURL=validation.js.map