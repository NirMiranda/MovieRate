/**
 * @swagger
 * tags:
 *   name: Review
 *   description: The Review API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - date
 *         - reviewerId
 *         - movieId
 *         - rating
 *         - image
 *         - text
 *       properties:
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date when the review was created
 *         reviewerId:
 *           type: string
 *           format: uuid
 *           description: ID of the reviewer (User)
 *         movieId:
 *           type: string
 *           format: uuid
 *           description: ID of the reviewed movie
 *         rating:
 *           type: number
 *           description: The rating given to the movie (between 0 and 10)
 *         likes:
 *           type: number
 *           description: The number of likes received for the review (optional)
 *         image:
 *           type: string
 *           description: URL to an image associated with the review
 *         text:
 *           type: string
 *           description: The text content of the review
 *       example:
 *         date: "2023-01-01T12:00:00Z"
 *         reviewerId: "609c6b96f259f218afafd42a"
 *         movieId: "609c6b96f259f218afafd42b"
 *         rating: 8.5
 *         likes: 15
 *         image: "https://example.com/review-image.jpg"
 *         text: "An insightful review of the movie."
 */

import { Router } from "express";
import reviewController from "../controllers/review_controller";

const router = Router();

/**
 * @swagger
 * /review/getAllReviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Review]
 *     responses:
 *       200:
 *         description: Returns a list of all reviews
 */
router.get("/getAllReviews", reviewController.getReviews);

/**
 * @swagger
 * /review/getReviewById/{_id}:
 *   get:
 *     summary: Get a review by ID
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the review to retrieve
 *     responses:
 *       200:
 *         description: Returns the details of a specific review
 */
router.get("/getReviewById/:_id", reviewController.getReviewById);

/**
 * @swagger
 * /review/addReview:
 *   post:
 *     summary: Add a new review
 *     tags: [Review]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: Returns the details of the newly added review
 */
router.post("/addReview", reviewController.addReviews);

/**
 * @swagger
 * /review/updateReview:
 *   put:
 *     summary: Update a review
 *     tags: [Review]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: Returns the details of the updated review
 */
router.put("/updateReview", reviewController.updateReview);
/**
 * @swagger
 * /review/deleteReview/{_id}:
 *   delete:
 *     summary: Delete a review by ID
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the review to delete
 *     responses:
 *       200:
 *         description: Review deleted successfully
 */
router.delete("/deleteReview/:_id", reviewController.deleteReview);

export default router;
