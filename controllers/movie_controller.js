const { json } = require("body-parser");
const Movie = require("../models/movie_model")

const getAllMovies = async (req, res) => {
    console.log("getAllMovies");
    try {
        let movies = '';
        if (req.query._id) {
            movies = await Movie.find({ _id: req.query._id })
        }
        else {
            movies = await Movie.find();
        }
        res.send(movies);
    } catch (error) {
        res.status(500).json({ message: err.message })
    }
};
const getMovieById = async (req, res) => {
    console.log("get movie by Id: ", req.params._id);
    try {
        const movie = await movie.findById(req.params._id)
        res.send(movie);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};

const postMovie = async (req, res) => {
    console.log("postMovie: ", req.body);
    const movie = new movie(req.body);
    try {
        await movie.save();
        res.send("OK")
    } catch (err) {
        console.log(err);
        res.send("failed: " + err.message);
    }
};

const putMovieById = (req, res) => {
    res.send("put Movie by  Id: " + req.params._id);
};

const deleteMovieById = (req, res) => {
    res.send("delete Movie by name: " + req.params._id);
};
module.exports = {
    getAllMovies,
    postMovie,
    getMovieById,
    putMovieById,
    deleteMovieById,
};