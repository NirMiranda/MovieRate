const express = require("express");
const router = express.Router();
const { getAllMovies,postMovie,getMovieById,deleteMovieById,updateMovie } = require("../controllers/movie_controller");


router.get("/getAllMovies", getAllMovies);
router.get("/getMovieById/:_id", getMovieById);
router.post("/postMovie", postMovie);
router.post("/updateMovie", updateMovie);
router.delete("/deleteMovieById/:_id", deleteMovieById);
module.exports = router;