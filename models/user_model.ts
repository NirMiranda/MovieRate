import mongoose from 'mongoose';
import validator from 'validator';

export type userType = {
    name: string,
    id: string,
    email: string,
    password: string,
    reviews: mongoose.Schema.Types.ObjectId[],
    age: number,
    tokens: string[],
    moviesUploaded: mongoose.Schema.Types.ObjectId[],
    photo: string
}



const userSchema = new mongoose.Schema<userType>({
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
        lowercase: true,
        validate: [validator.isEmail, 'Please provide an email']
    },
    password: {
        type: String,
        required: true

    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    age: {
        type: Number,
        required: true
    },
    tokens: {
        type: [String]
    },
    moviesUploaded: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movie",
        }
    ],
    photo: {
        type: String,
    },

});




export default mongoose.model<userType>("Users", userSchema);