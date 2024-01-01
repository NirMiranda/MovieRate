const jwt=require('jsonwebtoken')
const authMiddleWare= async (req,res,next)=>{
const authHeader=req.headers['authorization'];
const token=authHeader && authHeader.split(' ')[1]; //the token
if(token==null)
{
    return res.sendStatus(401);
}
jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
    console.log(err);
    if(err) return res.sendStatus(401);
    req.user =user;
    next();
})
}
module.exports=authMiddleWare