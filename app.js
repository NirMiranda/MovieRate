const express = require('express')
const dotenv = require("dotenv").config()
const mongoose = require('mongoose')
const bodyParser=require('body-parser');

const initApp=()=>{
const promise= new Promise(async (resolve,reject)=>{
 const db = mongoose.connection
 db.once('open', ()=>console.log('connected to mongoDB'))
await mongoose.connect(process.env.DATABASE_URL);
db.on('error', error=>{console.error(error)})


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const userRoute= require("./routes/user_routes.js")
const authRoute = require("./routes/auth_router.js");
app.use("/user",userRoute);
app.use("/auth",authRoute);

resolve(app);

});
return promise;
};




module.exports=initApp;