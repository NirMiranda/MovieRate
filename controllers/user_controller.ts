
import User, {userType} from "../models/user_model"
import authSchema from '../models/validation'
import { Request,Response } from "express";


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
    console.log("get user by id: ",req.params.id);
    try {
        const user= await User.findById(req.params.id)
        res.send(user);
    } catch (error: any) {
        res.status(500).json({message: error.message})
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

const updateUserById = async (req: Request, res: Response) => {
    try {
        const { name, email, id, password, age } = req.body;

        const user = await User.findById(id); 

        if (!user) {
            return res.status(404).send("User not found");
        }

        // Update user fields
        user.name = name;
        user.email = email;
        user.id = id;
        user.password = password;
        user.age = age;

        // Save the changes to the database
        await user.save();

        res.send("User updated successfully");
    } catch (error: any) {
        console.log("Can't update user:", error.message);
        res.status(500).send("Failed to update user");
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



export default {
    getAllUsers,
    postUser,
    getUserById,
    updateUserById,
    deleteUserById,
    getUserByEmail
};