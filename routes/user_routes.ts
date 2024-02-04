/**
 * @swagger
 * tags:
 *   name: User
 *   description: The User API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - age
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user
 *         id:
 *           type: string
 *           description: The ID of the user
 *         email:
 *           type: string
 *           description: The email address of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         reviews:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of review IDs associated with the user
 *         age:
 *           type: number
 *           description: The age of the user
 *         tokens:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of authentication tokens associated with the user
 *       example:
 *         name: "John Doe"
 *         id: "609c6b96f259f218afafd42a"
 *         email: "john@example.com"
 *         password: "hashed_password"
 *         reviews: ["609c6b96f259f218afafd42b", "609c6b96f259f218afafd42c"]
 *         age: 30
 *         tokens: ["token1", "token2"]
 */

import { Router, Request, Response } from "express";
import userController from "../controllers/user_controller";

const router = Router();

/**
 * @swagger
 * /user/email:
 *   get:
 *     summary: Get user by email
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email of the user to retrieve
 *     responses:
 *       200:
 *         description: Returns the details of the user
 */
router.get("/email", (req: Request, res: Response) => {
    userController.getUserByEmail(req, res);
});

/**
 * @swagger
 * /user/:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Returns a list of all users
 */
router.get("/", (req: Request, res: Response) => {
    userController.getAllUsers(req, res);
});

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to retrieve
 *     responses:
 *       200:
 *         description: Returns the details of the user
 */
router.get("/:id", (req: Request, res: Response) => {
    userController.getUserById(req, res);
});

router.get("/getMoviesByUserId/:id", (req: Request, res: Response) => {
    userController.getMoviesByUserId(req, res);
});

/**
 * @swagger
 * /user/:
 *   post:
 *     summary: Add a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Returns the details of the newly added user
 */
router.post("/", (req: Request, res: Response) => {
    userController.postUser(req, res);
});

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Returns the details of the updated user
 */
router.put("/:id", (req: Request, res: Response) => {
    userController.updateUserById(req, res);
});

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.delete("/:id", (req: Request, res: Response) => {
    userController.deleteUserById(req, res);
});

export default router;
