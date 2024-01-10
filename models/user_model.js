const mongoose = require("mongoose");
const validator=require('validator');



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
        lowercase:true,
        validate:[validator.isEmail,'Please provide an email']
    },    
    password:{
        type:String,
        required:true

    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "review",
        }
    ],
    age:{
        type: Number,
        required:true
    }, 
    tokens :{
        type :[String]
    },
    
});




module.exports= mongoose.model("Users", userSchema);