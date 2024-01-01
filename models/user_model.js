const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    
    isAdmin: {
        type: Boolean,
        default:false,
    },
    
    password:{
        type:String,
        required:true

    },
    /*
    reviewer: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "order",
        }
    ],
    */
    age:{
        type: Number,
        required:true
    }, 
    tokens :{
        type :[String]
    },
    
});




module.exports= mongoose.model("Users", userSchema);