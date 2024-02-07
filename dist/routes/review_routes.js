"use strict";
/**
 * @swagger
 * tags:
 *   name: Review
 *   description: The Review API
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = require("express");
const review_controller_1 = __importDefault(require("../controllers/review_controller"));
const router = (0, express_1.Router)();
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
router.get("/getAllReviews", review_controller_1.default.getReviews);
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
router.get("/getReviewById/:_id", review_controller_1.default.getReviewById);
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
router.post("/addReview", review_controller_1.default.addReviews);
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
router.put("/updateReview", review_controller_1.default.updateReview);
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
router.delete("/deleteReview/:_id", review_controller_1.default.deleteReview);
exports.default = router;
//# sourceMappingURL=review_routes.js.map