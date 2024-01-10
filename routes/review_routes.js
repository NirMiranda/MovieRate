const express = require("express");
const router = express.Router();
const { getReviews,addReviews,updateReview,deleteReview,getReviewById } = require("../controllers/review_controller");

router.get("/getAllReviews", getReviews);
router.get("/getReviewById/:_id", getReviewById);
router.post("/addReview", addReviews);
router.post("/updateReview", updateReview);
router.delete("/deleteReview/:_id", deleteReview);
module.exports = router;