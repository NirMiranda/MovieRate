
import User from "../models/user_model";
import bcrypt from "bcryptjs";
import jwt,{ JwtPayload } from 'jsonwebtoken';
import authSchema from '../models/validation';
import { Request,Response,NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";
import {userType} from "../models/user_model"
import { Document } from "mongoose";

const client= new OAuth2Client();

const genertToken=async (user: Document & userType)=>{
    const accessToken = await jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: process.env.JWT_EXPIRATION });
    const refreshToken = await jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET as string);

    if (user.tokens == null) user.tokens = [refreshToken];
    else user.tokens.push(refreshToken);

    await user.save();
    return {
        'accessToken':accessToken,
        'refreshToken': refreshToken,
    };
}
const googleSignIn= async(req: Request, res: Response) => {
    try{
        const ticket= await client.verifyIdToken({
            idToken: req.body.credential,
            audience:process.env.GOOGLE_CLIENT_ID,
        
          });
          const payload=ticket.getPayload();
          const email=payload?.email;
          if(email!=null)
          {
            let user= await User.findOne({'email': email});
            if(user==null){
                user= await User.create({
                    'name': payload?.name,
                    'email':email,
                    'password': "12345678",
                    'photo': payload?.picture,
                    'age':0,

                });
            }

           const response=await genertToken(user);
           res.status(200).send({user, ...response});
          }
         
    }catch(error){
      return res.status(400).json(error.message);
    }
  
}

const login = async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).send("Missing email OR password");
    }

    try {
        await authSchema.validateAsync({ email, password });
        const user = await User.findOne({ 'email': email }).populate({
            path: 'reviews',
            model: 'Review', // Use the model name you defined for the review model
        });

        if (user == null) {
            return res.status(406).send("Email does not exist");
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).send("Email or password incorrect");
        }

        const accessToken = await jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: process.env.JWT_EXPIRATION });
        const refreshToken = await jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET as string);

        if (user.tokens == null) user.tokens = [refreshToken];
        else user.tokens.push(refreshToken);

        await user.save();

        res.status(200).send({ 'accessToken': accessToken, 'refreshToken': refreshToken, 'user': user });
    } catch (error: any) {
        if (error.isJoi) {
            const errorMessage = error.details[0].message;
            res.status(400).json({ error: errorMessage });
        } else return res.status(400).send(`Error: ${error.message}`);
    }
};

const register = async (req: Request, res: Response) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const age = req.body.age;
    const fileUrl = req.body.fileUrl;
    if (!email || !password || !age || !name) {
        return res.status(400).json({ error: "Missing email, password, age, or name" });
    }

    try {
        await authSchema.validateAsync({ name, email, password, age });

       
        if (!isValidString(name)) {
            return res.status(400).json({ error: "Invalid full name. Please enter only letters." });
        }

        const response = await User.findOne({ 'email': email });

        if (response != null) {
            return res.status(406).json({ error: "Email is already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const response2 = await User.create({ 'name': name, 'email': email, 'password': encryptedPassword, 'age': age , 'photo': fileUrl});
        return res.status(201).json(response2);

    } catch (error: any) {
        if (error.isJoi === true) {
            const errorMessage = error.details[0].message;
            return res.status(400).json({ error: errorMessage });
        } else {
            return res.status(400).json({ error: `Error: ${error.message}` });
        }
    }
};

// Function to check if a given value is a valid string only letters)
const isValidString = (value: string): boolean => /^[a-zA-Z\s]+$/.test(value);


interface verifyType extends JwtPayload {
    _id: string;
}


const logout = async (req: Request, res: Response) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    }
    const userInfo=jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string) as verifyType;
        if (userInfo==null) {
            return res.status(403).send('Invalid request0');
        }
      
        const userId = userInfo._id; 
         console.log("the userID is:" ,userId);
        try {
            const user = await User.findById(userId);

            if (user == null) {
                return res.status(403).send('Invalid request1');
            }

            if (!user.tokens.includes(token)) {
                user.tokens = [];
                await user.save();
                return res.status(403).send('Invalid request2');
            }

            user.tokens.splice(user.tokens.indexOf(token), 1);
            await user.save();
            res.status(200).send('Logout successful RefreshToken in delete');
        } catch (err) {
            res.status(403).send('Invalid request3');
        }
   
};

interface IPayload extends Request {
    _id?: string;
}

const refreshToken = async (req: IPayload, res: Response, next: NextFunction) => {
    const authHeaders = req.headers['authorization'];
    const token = authHeaders && authHeaders.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string, async (error, userInfo) => {
        if (error) return res.status(403).send(error.message);

        const userId = req._id;

        try {
            const user = await User.findById(userId).populate({
                path: 'reviews',
                model: 'Review',
            }).exec();
            console.log(user);
            
            if (user == null) return res.status(403).send('Invalid request');
            if (!user.tokens.includes(token)) {
                user.tokens = [];
                await user.save();
                return res.status(403).send('Invalid request');
            }

            const accessToken = await jwt.sign({ '_id': user._id }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: process.env.JWT_EXPIRATION });
            const refreshToken = await jwt.sign({ '_id': user._id }, process.env.REFRESH_TOKEN_SECRET as string);

            user.tokens[user.tokens.indexOf(token)] = refreshToken;
            await user.save();
            res.status(200).send({ 'accessToken': accessToken, 'refreshToken': refreshToken });

        } catch (error: any) {
            res.status(403).send(error.message);
        }
    });
};

export default { logout, register, login, refreshToken , googleSignIn};
