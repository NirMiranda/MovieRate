const express = require('express')
const dotenv = require("dotenv").config()
const mongoose = require('mongoose')
const bodyParser=require('body-parser');

mongoose.connect (process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', error=>{console.error(error)})
db.once('open', ()=>console.log('connected to mongoDB'))



const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const userRoute= require("./routes/user_routes")
app.use("/user",userRoute);

const port = process.env.PORT;


module.exports=app;