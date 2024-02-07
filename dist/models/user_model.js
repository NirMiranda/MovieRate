"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: [validator_1.default.isEmail, 'Please provide an email']
    },
    password: {
        type: String,
        required: true
    },
    reviews: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    age: {
        type: Number,
        required: true
    },
    tokens: {
        type: [String]
    },
    moviesUploaded: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Movie",
        }
    ],
    photo: {
        type: String,
    },
});
exports.default = mongoose_1.default.model("Users", userSchema);
//# sourceMappingURL=user_model.js.map