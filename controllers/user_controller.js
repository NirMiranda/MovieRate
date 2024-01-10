
const User= require("../models/user_model")
const {authSchema}=require('../models/validation');

/*crud*/
const getAllUsers =async (req,res)=>{
    console.log("getAllUsers");
    try {
        let users='';
        if (req.query.name) {
            users= await User.find({name: req.query.name})
        }
        else {
            users = await User.find();
        }
        res.send(users);
    } catch (error) {
        res.status(500).json({message: err.message})
    }
};

const getUserById = async (req, res) => {
    console.log("get user by id: ",req.params.id);
    try {
        const user= await User.findById(req.params.id)
        res.send(user);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
};

const postUser = async (req, res) => {
    try{
    const { email, password, name, age } = req.body;
    await authSchema.validateAsync({ name, email, password, age });

    const user=new User(req.body);
    try {
        await user.save();
        res.send("OK");
    } catch (err) {
        console.log(err);
        res.send("failed: " + err.message);
    }
    }catch (error) {
        if (error.isJoi === true) {
           const errorMessage = error.details[0].message; // Extract the error message from the validation error
           res.status(400).json({ error: errorMessage }); // Return the error message as JSON
        }
     }
};

const updateUserById = async (req, res) => {
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
    } catch (err) {
        console.log("Can't update user:", err.message);
        res.status(500).send("Failed to update user");
    }
};


const deleteUserById = async (req, res) => {
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
    } catch (err) {
        console.log("Can't delete user:", err.message);
        res.status(500).send("Failed to delete user");
    }
};



module.exports= {
    getAllUsers,
    postUser,
    getUserById,
    updateUserById,
    deleteUserById,
};