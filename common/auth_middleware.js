
// authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/user_model');

const authMiddleware = async (req, res, next) => {
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

        req.user = user; // Set the user information in the request object
        next();
    } catch (err) {
        return res.sendStatus(401);
    }
};

module.exports = authMiddleware;
