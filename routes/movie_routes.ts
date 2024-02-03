import { Router } from "express";
import movieController from "../controllers/movie_controller";

/**
 * @swagger
 * tags:
 *   name: Movie
 *   description: The Movie API
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *         - movieName
 *         - year
 *         - director
 *         - actors
 *         - genre
 *         - image
 *         - ratingImdb
 *       properties:
 *         movieName:
 *           type: string
 *           description: The name of the movie
 *         year:
 *           type: number
 *           description: The release year of the movie
 *         director:
 *           type: string
 *           description: The director of the movie
 *         actors:
 *           type: array
 *           items:
 *             type: string
 *           description: The list of actors in the movie
 *         genre:
 *           type: string
 *           description: The genre of the movie
 *         image:
 *           type: string
 *           description: URL to the image of the movie
 *         description:
 *           type: string
 *           description: Description of the movie
 *         ratingImdb:
 *           type: number
 *           description: IMDb rating of the movie (between 0 and 10)
 *         reviews:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of review IDs associated with the movie
 *         trailer:
 *           type: string
 *           description: URL to the movie trailer
 *       example:
 *         movieName: "Inception"
 *         year: 2010
 *         director: "Christopher Nolan"
 *         actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"]
 *         genre: "Sci-Fi"
 *         image: "https://example.com/inception.jpg"
 *         description: "A mind-bending heist thriller"
 *         ratingImdb: 8.8
 *         reviews: ["609c6b96f259f218afafd42a", "609c6b96f259f218afafd42b"]
 *         trailer: "https://youtube.com/inception-trailer"
 */

const router = Router();

/**
 * @swagger
 * /movie/getAllMovies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movie]
 *     responses:
 *       200:
 *         description: Returns a list of all movies
 */
router.get("/getAllMovies", movieController.getAllMovies);

/**
 * @swagger
 * /movie/getMovieById/{_id}:
 *   get:
 *     summary: Get a movie by ID
 *     tags: [Movie]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the movie to retrieve
 *     responses:
 *       200:
 *         description: Returns the details of a specific movie
 */
router.get("/getMovieById/:_id", movieController.getMovieById);

/**
 * @swagger
 * /movie/postMovie:
 *   post:
 *     summary: Add a new movie
 *     tags: [Movie]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: Returns the details of the newly added movie
 */
router.post("/postMovie", movieController.postMovie);

/**
 * @swagger
 * /movie/updateMovie:
 *   put:
 *     summary: Update a movie
 *     tags: [Movie]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: Returns the details of the updated movie
 */

router.put("/updateMovie", movieController.updateMovie);

/**
 * @swagger
 * /movie/deleteMovieById/{_id}:
 *   delete:
 *     summary: Delete a movie by ID
 *     tags: [Movie]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the movie to delete
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 */
router.delete("/deleteMovieById/:_id", movieController.deleteMovieById);

export default router;
