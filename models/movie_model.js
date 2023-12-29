const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
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
    category: {
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
    ratingImdb: {
        type: Number,
        required: true,
        min: 0,
        max: 10,
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

module.exports = mongoose.model('Movie', movieSchema);