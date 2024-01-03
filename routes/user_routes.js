const express = require("express");
const router = express.Router();
const User=require("../controllers/user_controller")
const authMiddleware = require('../common/auth_middleware');

// Apply authMiddleware to secure the routes
router.use(authMiddleware);

router.get("/", (req, res) => {
    User.getAllUsers(req,res);
});

router.get("/:id", (req, res) => {
    User.getUserById(req,res);
});


router.post("/",  (req, res) => {
    User.postUser(req,res);
});

router.put("/:id", (req, res) => {
    User.putUserById(req,res);});

router.delete("/:id", (req, res) =>{
    User.deleteUserById(req,res);
});

module.exports = router;

/* להתייעץ לגבי ה middleWare*/