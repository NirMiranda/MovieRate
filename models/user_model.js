const mongoose = require("mongoose");

const userSchema = new mongoose. Schema ({
    name: {
        type: String,
        required: true,
    },
    _id: {
        type: String,
    },
    email: {
        type: String,
    },
});

module.exports= mongoose.model("Users", userSchema);