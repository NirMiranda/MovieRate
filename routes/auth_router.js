
const express = require("express");
const router = express.Router();
const auth = require('../controllers/auth_controller');
const authMiddleware = require('../common/auth_middleware');

router.post('/register', (req, res) => {
    auth.register(req, res);
});

router.post('/login', (req, res) => {
    auth.login(req, res);
});

// Apply authMiddleware to secure the logout route
router.post('/logout', authMiddleware, (req, res) => {
    auth.logout(req, res);
});

router.post('/refreshToken', (req, res) => {
    auth.refreshToken(res, req);
});

module.exports = router;
