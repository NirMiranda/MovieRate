const { json } = require("body-parser");
const Movie= require("../models/movie_model");

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
        const movie = await Movie.findById(req.params._id)
        res.send(movie);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};

const postMovie = async (req, res) => {
    const movie = new Movie(req.body);
    try {
        await movie.save();
        res.send(movie)
        console.log("postMovie: ", movie);
    } catch (err) {
        console.log(err);
        res.send("failed: " + err.message);
    }
};



const deleteMovieById = async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params._id);
        if (!deletedMovie) {
            return res.status(404).send("Movie not found");
        }
        res.send("Movie deleted: " + deletedMovie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateMovie = async (req, res) => {
    const {_id,movieName,year,director,actors,genre,image,description,ratingImdb,reviews,trailer} = req.body;
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(_id, { movieName, year, director, actors, genre, image, description, ratingImdb, trailer, reviews }, { new: true });
        res.send(updatedMovie)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports= {
    getAllMovies,
    postMovie,
    getMovieById,
    deleteMovieById,
    updateMovie,
};