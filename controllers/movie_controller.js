const { json } = require("body-parser");
const Movie = require("../models/movie_model")

const getAllMovies = async (req, res) => {
    console.log("getAllMovies");
    try {
        let movies = '';
        if (req.query.name) {
            movies = await Movie.find({ name: req.query.name })
        }
        else {
            movies = await Movie.find();
        }
        res.send(movies);
    } catch (error) {
        res.status(500).json({ message: err.message })
    }
};
const getMovieByName = async (req, res) => {
    console.log("get movie by name: ", req.params.movieName);
    try {
        const movie = await movie.findById(req.params.movieName)
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

const putMovieByName = (req, res) => {
    res.send("put Movie by name: " + req.params.movieName);
};

const deleteMovieByName = (req, res) => {
    res.send("delete Movie by name: " + req.params.movieName);
};
module.exports = {
    getAllMovies,
    postMovie,
    getMovieByName,
    putMovieByName,
    deleteMovieByName,
};