import Router, { NextFunction } from "express";
const router = Router();
import auth from '../controllers/auth_controller';
import { Request,Response } from "express";


router.post('/register', (req: Request, res: Response) => {
    auth.register(req, res);
});

router.post('/login', (req: Request, res: Response) => {
    auth.login(req, res);
});

// Apply authMiddleware to secure the logout route
router.post('/logout', (req: Request, res: Response) => {
    auth.logout(req, res);
});

router.post('/refreshToken', (req: Request, res: Response, next: NextFunction) => {
    auth.refreshToken(req, res, next);
});

export default router;