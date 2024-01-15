import Router from "express";
const router = Router();
import reviewController from "../controllers/review_controller";


router.get("/getAllReviews",reviewController.getReviews);
router.get("/getReviewById/:_id",reviewController.getReviewById);
router.post("/addReview", reviewController.addReviews);
router.post("/updateReview",reviewController.updateReview);
router.delete("/deleteReview/:_id",reviewController.deleteReview);
export default router;