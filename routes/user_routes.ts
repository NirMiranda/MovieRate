import Router from "express";
const router = Router();
import userController from "../controllers/user_controller";
import { Request, Response } from "express";

router.put("/:id", (req: Request, res: Response) => {
    userController.updateUserById(req, res);
  });
  
router.get("/token",(req: Request, res: Response) =>{
userController.getUserByToken(req,res)}); 

router.get("/", (req: Request, res: Response) => {
  userController.getAllUsers(req, res);
});

router.get("/:id", (req: Request, res: Response) => {
  userController.getUserById(req, res);
});

router.post("/", (req: Request, res: Response) => {
  userController.postUser(req, res);
});

router.delete("/:id", (req: Request, res: Response) => {
  userController.deleteUserById(req, res);
});

export default router;
