"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reviewSchema = new mongoose_1.default.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    reviewerId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Users"
    },
    movieId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Movie"
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
    },
    likes: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
});
exports.default = mongoose_1.default.model('Review', reviewSchema);
//# sourceMappingURL=review_model.js.map