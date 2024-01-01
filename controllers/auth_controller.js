
const User=require("../models/user_model");
const bcrypt=require("bcrypt");
const jwt= require('jsonwebtoken');

const login=async(req,res)=>{
   
    const email=req.body.email;
    const password=req.body.password;
    if (!email || !password ) {
     return res.status(400).send("Missing email OR password");
    }
     try{
 
         const user= await User.findOne({'email': email});
         if(user==null)
         {
             return res.status(406).send("email is not exists ");
         }
         const match= await bcrypt.compare(password,user.password);
         if(!match)
         {
           return res.status(401).send("email or password incorrect");
         }
        const token= jwt.sign({_id: user.id} ,process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRATION });
        return res.status(200).send({'accessToken': token});
         
        
     }catch(error){
         return res.status(400).send(`Error: ${error.message}`);
     }
};

const register=async(req,res)=>{

   const name=req.body.name;
   const email=req.body.email;
   const password=req.body.password;
   const age=req.body.age;
   
   if (!email || !password || !age || !name) {
    return res.status(400).send("Missing email, password, age, or name");
   }
    try{

        const response= await User.findOne({'email': email});
        if(response!=null)
        {
            return res.status(406).send("email is already exists ");
        }
        const salt=await bcrypt.genSalt(10);
        encryptedPassword=await bcrypt.hash(password,salt);

        const response2=await  User.create({'name':name,'email':email,'password':encryptedPassword,'age':age });
        return res.status(201).send(response2);

    }catch(error){
        return res.status(400).send(`Error: ${error.message}`);
    }
};

const logout=async(req,res)=>{
    console.log('logout');
    res.status(400).send({
        'status':'fail',
        'message':'not implemented'
    });
};
module.exports={logout,register,login};