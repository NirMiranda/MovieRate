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
import { Request, Response } from "express";

const router = Router();

// Route for getting user by email
router.get("/email", (req: Request, res: Response) => {
    console.log("Handling /email route");
    userController.getUserByEmail(req, res);
});

// Route for getting all users
router.get("/", (req: Request, res: Response) => {
    console.log("Handling / route");
    userController.getAllUsers(req, res);
});

// Route for getting user by ID
router.get("/:id", (req: Request, res: Response) => {
    console.log("Handling /:id route");
    userController.getUserById(req, res);
});

// Route for posting a new user
router.post("/", (req: Request, res: Response) => {
    console.log("Handling POST / route");
    userController.postUser(req, res);
});

// Route for updating user by ID
router.put("/:id", (req: Request, res: Response) => {
    console.log("Handling PUT /:id route");
    userController.updateUserById(req, res);
});

// Route for deleting user by ID
router.delete("/:id", (req: Request, res: Response) => {
    console.log("Handling DELETE /:id route");
    userController.deleteUserById(req, res);
});

export default router;
