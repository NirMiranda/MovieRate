const { ref } = require('joi');
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    reviewerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie"
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
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

module.exports = mongoose.model('Review', reviewSchema);