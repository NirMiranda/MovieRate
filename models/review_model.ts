import mongoose from 'mongoose';
export type reviewType = {
    date: Date,
    reviewerId: mongoose.Schema.Types.ObjectId,
    movieId: mongoose.Schema.Types.ObjectId,
    rating: Number,
    likes?: Number,
    image: String,
    text: String,
}

const reviewSchema = new mongoose.Schema<reviewType>({
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    reviewerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie"
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
    },
    likes: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
});

export default mongoose.model<reviewType>('Review', reviewSchema);