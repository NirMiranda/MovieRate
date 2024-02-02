import { json } from "body-parser";
import Movie, { movieType } from "../models/movie_model";
import User from "../models/user_model";
import { Request, Response } from "express";


const getAllMovies = async (req: Request, res: Response) => {
    console.log("getAllMovies");
    try {
        let movies: movieType[];
        if (req.query._id) {
            movies = await Movie.find({ _id: req.query._id })
        }
        else {
            movies = await Movie.find();
        }
        res.send(movies);
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
};
const getMovieById = async (req: Request, res: Response) => {
    console.log("get movie by Id: ", req.params._id);
    try {
        const movie = await Movie.findById(req.params._id)
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
            })
        res.send(movie);
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
};

const postMovie = async (req: Request, res: Response) => {
    const movie = new Movie(req.body);
    try {
        await movie.save();
        res.send(movie)
        console.log("postMovie: ", movie);
    } catch (err: any) {
        console.log(err);
        res.send("failed: " + err.message);
    }
};



const deleteMovieById = async (req: Request, res: Response) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params._id);
        if (!deletedMovie) {
            return res.status(404).send("Movie not found");
        }
        res.send("Movie deleted: " + deletedMovie);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};
const updateMovie = async (req: Request, res: Response) => {
    const { _id, movieName, year, director, actors, genre, image, description, reviews, trailer } = req.body;
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(_id, { movieName, year, director, actors, genre, image, description, trailer, reviews }, { new: true });
        res.send(updatedMovie)
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
export default {
    getAllMovies,
    postMovie,
    getMovieById,
    deleteMovieById,
    updateMovie,
};