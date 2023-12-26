const express = require("express");
const router = express.Router();
const Movie = require("../controllers/movie_controller")

router.get("/", (req, res) => {
    Movie.getAllMovies(req, res);
});
router.get("/:movie_name", (req, res) => {
    Movie.getMovieByName(req, res);
});
router.post("/", (req, res) => {
    Movie.postMovie(req, res);
});

router.put("/:movie_name", (req, res) => {
    Movie.putMovieByName(req, res);
});

router.delete("/:movie_name", (req, res) => {
    Movie.deleteMovieByName(req, res);
    I
});
module.exports = router;