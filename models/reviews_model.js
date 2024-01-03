const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    movieName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10,
    },
    movieName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie"
    },
    likes: {
        type: Number,
        required: true,
        min: 0,
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

module.exports = mongoose.model('Review', reviewSchema);