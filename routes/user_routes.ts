import Router from "express";
const router = Router();
import userController from "../controllers/user_controller";
import { Request,Response } from "express";
import authMiddleware from '../common/auth_middleware';

// Apply authMiddleware to secure the routes
router.use(authMiddleware);

router.get("/", (req: Request, res: Response) => {
    userController.getAllUsers(req,res);
});

router.get("/:id", (req: Request, res: Response) => {
    userController.getUserById(req,res);
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

