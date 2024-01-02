const express = require("express");
const router = express.Router();
const Movie = require("../controllers/movie_controller").default

router.get("/", (req, res) => {
    Movie.getAllMovies(req, res);
});
router.get("/:_id", (req, res) => {
    Movie.getMovieById(req, res);
});
router.post("/", (req, res) => {
    Movie.postMovie(req, res);
});
router.put("/:_id", (req, res) => {
    Movie.putMovieById(req, res);
});
router.delete("/:_id", (req, res) => {
    Movie.deleteMovieById(req, res);
    I
});
module.exports = router;