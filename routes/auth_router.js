const express =require("express");
const router =express.Router();
const auth =require( '../controllers/auth_controller')

router.post('/register',(req,res)=>{
    auth.register(req,res);
});
router.post('/login',(req,res)=>{
    auth.login(req,res);
});
router.post('/logout',(req,res)=>{
    auth.logout(req,res);
});

module.exports=router;