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
const review_model_1 = __importDefault(require("../models/review_model"));
const user_model_1 = __importDefault(require("../models/user_model"));
const movie_model_1 = __importDefault(require("../models/movie_model"));
const getReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let reviews;
        if (req.query._id) {
            reviews = yield review_model_1.default.find({ _id: req.query._id });
        }
        else {
            reviews = yield review_model_1.default.find();
        }
        res.send(reviews);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const getReviewById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield review_model_1.default.findById(req.params._id).populate("reviewerId").populate("movieId");
        res.send(review);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
//add Review
const addReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, reviewerId, movieId, rating, image, text } = req.body;
    try {
        const movie = yield movie_model_1.default.findById(movieId);
        const user = yield user_model_1.default.findById(reviewerId);
        const newReview = new review_model_1.default({ date, reviewerId, movieId, rating, image, text });
        const savedReview = yield newReview.save();
        console.log(user);
        if (!movie || !user) {
            res.send("Movie or user not found");
            return;
        }
        movie.reviews.push(savedReview.id);
        user.reviews.push(savedReview.id);
        yield movie_model_1.default.findByIdAndUpdate(movie._id, movie);
        yield user_model_1.default.findByIdAndUpdate(user._id, user);
        res.send(savedReview);
    }
    catch (err) {
        console.error(err);
    }
});
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, date, reviewerId, movieId, rating, likes, image, text } = req.body;
    const newReview = yield review_model_1.default.findByIdAndUpdate(_id, { date, reviewerId, movieId, rating, likes, image, text }, { new: true });
    res.send(newReview);
    console.log("update succeded");
});
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    const deletedReview = yield review_model_1.default.findById(_id);
    if (deletedReview) {
        yield movie_model_1.default.updateOne({ _id: deletedReview.movieId }, { $pull: { reviews: _id } });
        yield user_model_1.default.updateOne({ _id: deletedReview.reviewerId }, { $pull: { reviews: _id } });
        yield review_model_1.default.findByIdAndDelete(_id);
        res.send("Review deleted");
        console.log("Review deleted");
    }
    else {
        res.send("Review not found");
        console.log("Review not found");
    }
});
exports.default = {
    getReviews,
    getReviewById,
    addReviews,
    updateReview,
    deleteReview,
};
//# sourceMappingURL=review_controller.js.map