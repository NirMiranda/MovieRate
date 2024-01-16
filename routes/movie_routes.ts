import Router from "express";
const router = Router();
import movieController from "../controllers/movie_controller";


router.get("/getAllMovies", movieController.getAllMovies);
router.get("/getMovieById/:_id", movieController.getMovieById);
router.post("/postMovie", movieController.postMovie);
router.post("/updateMovie", movieController.updateMovie);
router.delete("/deleteMovieById/:_id", movieController.deleteMovieById);
export default router;