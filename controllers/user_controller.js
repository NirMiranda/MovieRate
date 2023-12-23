const { json } = require("body-parser");
const User= require("../models/user_model")

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
    console.log("postStudent: ",req.body);
    const user=new User(req.body);
    try {
        await user.save();
        res.send("OK")
    } catch (err) {
        console.log(err);
        res.send("failed: " + err.message);
    }
};

const putUserById = (req, res) => {
    res.send("put User by id: " + req.params.id);
};

const deleteUserById = (req, res) => {
    res.send("delete User by id: " + req.params.id);
};

module.exports= {
    getAllUsers,
    postUser,
    getUserById,
    putUserById,
    deleteUserById,
};