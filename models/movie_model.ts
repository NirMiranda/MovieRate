import mongoose from 'mongoose';
export type movieType = {
    movieName: string,
    year: number,
    director: string,
    actors: string[],
    genre: string,
    image: string,
    description: string,
    reviews: mongoose.Schema.Types.ObjectId[],
    trailer: string
}

const movieSchema = new mongoose.Schema<movieType>({
    movieName: {
        type: String,
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
    // ratingImdb: {
    //     type: Number,
    //     required: true,
    //     min: 0,
    //     max: 10,
    // },
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