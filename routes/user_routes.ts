import { Router, Request, Response } from "express";
import userController from "../controllers/user_controller";

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
