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
const movie_model_1 = __importDefault(require("../models/movie_model"));
const getAllMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getAllMovies");
    try {
        let movies;
        if (req.query._id) {
            movies = yield movie_model_1.default.find({ _id: req.query._id });
        }
        else {
            movies = yield movie_model_1.default.find();
        }
        res.send(movies);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const getMovieById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("get movie by Id: ", req.params._id);
    try {
        const movie = yield movie_model_1.default.findById(req.params._id)
            .populate({
            path: "reviews",
            populate: {
                path: "reviewerId",
                model: "Users",
            },
        }).populate({
            path: "reviews",
            populate: {
                path: "movieId",
                model: "Movie",
            },
        }).populate({
            path: "uploadedBy",
            model: "Users",
        });
        res.send(movie);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
const postMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movie = new movie_model_1.default(req.body);
    try {
        yield movie.save();
        res.send(movie);
        console.log("postMovie: ", movie);
    }
    catch (err) {
        console.log(err);
        res.send("failed: " + err.message);
    }
});
const deleteMovieById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedMovie = yield movie_model_1.default.findByIdAndDelete(req.params._id);
        if (!deletedMovie) {
            return res.status(404).send("Movie not found");
        }
        res.send("Movie deleted: " + deletedMovie);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
const updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, movieName, year, director, actors, genre, image, description, reviews, trailer } = req.body;
    try {
        const updatedMovie = yield movie_model_1.default.findByIdAndUpdate(_id, { movieName, year, director, actors, genre, image, description, trailer, reviews }, { new: true });
        res.send(updatedMovie);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.default = {
    getAllMovies,
    postMovie,
    getMovieById,
    deleteMovieById,
    updateMovie,
};
//# sourceMappingURL=movie_controller.js.map