import express from 'express'
import dotenv from "dotenv"
dotenv.config()
import mongoose  from 'mongoose'
import bodyParser from 'body-parser';
import { Application } from 'express';

import userRoute from "./routes/user_routes"
import authRoute from "./routes/auth_router"
import movieRoute from "./routes/movie_routes"
import reviewRoute from "./routes/review_routes"


const initApp=():Promise<Application>=>{
const promise= new Promise<Application>(async (resolve,reject)=>{
 const db = mongoose.connection
 db.once('open', ()=>console.log('connected to mongoDB'))
await mongoose.connect(process.env.DATABASE_URL!);
db.on('error', error=>{console.error(error)})


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



app.use("/user",userRoute);
app.use("/auth",authRoute);
app.use("/movie",movieRoute);
app.use("/review",reviewRoute);


resolve(app);

});
return promise;
};


export default initApp;