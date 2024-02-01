
import { ObjectId } from "mongoose";
import User, {userType} from "../models/user_model"
import authSchema from '../models/validation'
import Review from "../models/review_model";
import Movie from "../models/movie_model";
import { Request,Response } from "express";
import jwt,{ JwtPayload } from 'jsonwebtoken';
import bcrypt from "bcryptjs";


/*crud*/
const getAllUsers =async (req: Request, res: Response)=>{
    console.log("getAllUsers");
    try {
        let users: userType[];
        if (req.query.name) {
            users= await User.find({name: req.query.name})
        }
        else {
            users = await User.find();
        }
        res.send(users);
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
};



const getUserByEmail = async (req: Request, res: Response)=>{
  try {
    const {email} = req.query; 

    if (!email) {
      res.status(400).send('Email parameter is missing');
      return;
    }

    const user = await User.findOne({ 'email': email });

    if (!user) {
      res.status(404).send('User not found');
      return;
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    
    res.status(500).send('Internal Server Error');
  }
};



const getUserById = async (req: Request, res: Response) => {
    try {
      console.log("get user by id: ", req.params.id);
        const user = await User.findById(req.params.id);
        console.log(user);
         res.send(user);
    } catch (error: any) {
        console.error('Error retrieving user by ID:', error.message);
        res.status(500).json({ message: error.message });
        return null;
    }
};

const postUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, age } = req.body;
        await authSchema.validateAsync({ name, email, password, age }); // Use the validateAsync function from the imported authSchema

        const user = new User(req.body);
        try {
            await user.save();
            res.send("OK");
        } catch (error: any) {
            console.log('error1')
            console.log(error);
            res.send("failed: " + error.message);
        }
    } catch (error: any) {
        if (error.isJoi === true) {
            console.log('error')
           const errorMessage = error.details[0].message; // Extract the error message from the validation error
           res.status(400).json({ error: errorMessage }); // Return the error message as JSON
        }
     }
};

const extractErrorMessages = (error: any) => {
  if (error.isJoi === true) {
      return error.details.map((detail: any) => detail.message).join(', ');
  }
  return error.message;
};

const updateUserById = async (req: Request, res: Response) => {
  try {
      const userId = req.params.id;
      console.log('Update request received for user ID:', userId);
      const { name, email, password, age } = req.body;

      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).send('User not found');
      }

      // Validate name, email, password, and age using authSchema
      const validationObject = { name, email, password, age };

      try {
          await authSchema.validateAsync(validationObject, { abortEarly: false });
      } catch (validationError) {
          const errorMessage = extractErrorMessages(validationError);
          return res.status(400).json({ error: errorMessage });
      }

      // Update user fields
      user.name = name;
      user.email = email;
      user.age = age;

      // Check if the password is being updated
    
          // Hash the new password
          console.log("Updating password");
          const salt = await bcrypt.genSalt(10);
          const encryptedPassword = await bcrypt.hash(password, salt);
          user.password = encryptedPassword;
      

      // Save the changes to the database
      await user.save();

      res.send('User updated successfully');
  } catch (error: any) {
      const errorMessage = extractErrorMessages(error);
      return res.status(500).json({ error: errorMessage });
  }
};

const deleteUserById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        // Retrieve user details before deletion
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send("User not found");
        }

        // Delete the user
        await User.findByIdAndDelete(id);

        // Respond with the deleted user details
        res.send("User deleted successfully");
        console.log("User deleted:", user);
    } catch (error: any) {
        console.log("Can't delete user:", error.message);
        res.status(500).send("Failed to delete user");
    }
};
interface verifyType extends JwtPayload {
    _id: string;
}
const getUserByToken = async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers['authorization'];
      const refreshToken = authHeader && authHeader.split(' ')[1];
  
      if (!refreshToken) {
        return res.status(401).send("Unauthorized: Missing refreshToken");
      }
  
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as verifyType;
      console.log("Decoded token payload:", decoded);
      if (!decoded) {
        return res.status(401).send("Unauthorized: Invalid refreshToken");
      }
      const userId=decoded._id;
      console.log(userId);
      const user = await User.findById(userId).populate({
        path: 'reviews',
        model: 'Review',
      }).exec();;
  
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      res.status(200).json({ user });
    } catch (error: any) {
      console.error("Error retrieving user by refreshToken:", error.message);
      res.status(500).send("Failed to retrieve user");
    }
  };



export default {
    getAllUsers,
    postUser,
    getUserById,
    updateUserById,
    deleteUserById,
    getUserByEmail,
    getUserByToken
    
};