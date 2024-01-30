import mongoose from 'mongoose';
export type movieType = {
    movieName: string,
    uploadedBy: mongoose.Schema.Types.ObjectId,
    year: number,
    director: string,
    actors: string[],
    genre: string,
    image: string,
    description: string,
    ratingImdb: number,
    reviews: mongoose.Schema.Types.ObjectId[],
    trailer: string
}

const movieSchema = new mongoose.Schema<movieType>({
    movieName: {
        type: String,
        required: true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    actors: {
        type: [String],
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    trailer: {
        type: String,
    },
});

export default mongoose.model<movieType>('Movie', movieSchema);