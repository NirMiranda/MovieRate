"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const movieSchema = new mongoose_1.default.Schema({
    movieName: {
        type: String,
        required: true
    },
    uploadedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    actors: {
        type: [String],
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    reviews: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    trailer: {
        type: String,
    },
});
exports.default = mongoose_1.default.model('Movie', movieSchema);
//# sourceMappingURL=movie_model.js.map