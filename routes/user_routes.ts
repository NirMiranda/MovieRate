import Router from "express";
const router = Router();
import userController from "../controllers/user_controller";
import { Request,Response } from "express";
import authMiddleware from '../common/auth_middleware';




router.get("/", (req: Request, res: Response) => {
    userController.getAllUsers(req,res);
});

router.get("/:id", (req: Request, res: Response) => {
    userController.getUserById(req,res);
});

router.get("/me", authMiddleware, async (req: Request & { userId?: string }, res: Response) => {
    try {
        const user = await userController.getUserById(req, res);
        if (user) {
            // Return the user details without exposing sensitive information
            const { id, name, email, age } = user;
            res.status(200).json({ id, name, email, age });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error retrieving user details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post("/",  (req: Request, res: Response) => {
    userController.postUser(req,res);
});

router.put("/:id", (req: Request, res: Response) => {
    userController.updateUserById(req,res);});

router.delete("/:id", (req: Request, res: Response) =>{
    userController.deleteUserById(req,res);
});

export default router;

