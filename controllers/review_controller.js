const Review = require("../models/review_model");
const User = require("../models/user_model")
const Movie = require("../models/movie_model")

const getReviews = async (req, res) => {
    try {
        let reviews = '';
        if (req.query._id) {
            reviews = await Review.find({ _id: req.query._id })
        }
        else {
            reviews = await Review.find();
        }
        res.send(reviews);
    } catch (error) {
        res.status(500).json({ message: err.message })
    }
}

const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params._id)
        res.send(review);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//add Review
const addReviews = async (req, res) => {
    const { date,reviewerId,movieId, rating, image, text } = req.body
    try {
        const movie = await Movie.findById(movieId);
        const user = await User.findById(reviewerId);
        const newReview = new Review({ date,reviewerId,movieId, rating, image, text });
        const savedReview = await newReview.save();
        console.log(user);
        movie.reviews.push(savedReview._id);
        user.reviews.push(savedReview._id);

        const changedMovie = await Movie.findByIdAndUpdate(movie._id, movie);
        const changedUser = await User.findByIdAndUpdate(user._id, user);
        res.send(savedReview);
    } catch (err) {
        console.error(err);
    }
}

const updateReview = async (req, res) => {
    const { _id, date,reviewerId,movieId, rating, image, text } = req.body;
    const newReview = await Review.findByIdAndUpdate(_id, { date,reviewerId,movieId, rating, image, text } , { new: true });
    res.send(newReview);
    console.log("update succeded");
}

const deleteReview = async (req, res) => {
    const { _id } = req.params;
    const deletedReview = await Review.findById(_id);
    if (deletedReview) {
        const movie = await Movie.findById(deletedReview.movieId);
        movie.reviews.pull(_id);
        await Review.findByIdAndDelete(_id);
        const changedMovie = await Movie.findByIdAndUpdate(movie._id, movie);
        res.send("Review deleted")
        console.log("Review deleted");

    }
    else {
        res.send("Review not found");
        console.log("Review not found");
    }
}

module.exports = {
    getReviews,
    getReviewById,
    addReviews,
    updateReview,
    deleteReview,
};