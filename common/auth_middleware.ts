import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string) as { userId: string };
        (req as any).userId = decoded.userId; // Use type assertion to avoid TypeScript error
        console.log((req as any).userId);
        next();
    } catch (error) {
        res.status(401).send({ error: 'Unauthorized' });
    }
};

export default authMiddleware;
