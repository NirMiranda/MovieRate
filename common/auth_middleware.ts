
// authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/user_model');
import { Request,Response,NextFunction  } from "express";


const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded._id);

        if (!user) {
            return res.sendStatus(401);
        }

        
        next();
    } catch (err) {
        return res.sendStatus(401);
    }
};

export default authMiddleware;
