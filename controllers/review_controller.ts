    import Review, { reviewType } from "../models/review_model";
    import User from "../models/user_model";
    import Movie,{ movieType } from "../models/movie_model";
    import { Request,Response } from "express";


    const getReviews = async (req: Request, res: Response) => {
        try {
            let reviews: reviewType[];
            if (req.query._id) {
                reviews = await Review.find({ _id: req.query._id })
            }
            else {
                reviews = await Review.find();
            }
            res.send(reviews);
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }

    const getReviewById = async (req: Request, res: Response) => {
        try {
            const review = await Review.findById(req.params._id).populate("reviewerId").populate("movieId");
            res.send(review);
        } catch (err: any) {
            res.status(500).json({ message: err.message })
        }
    }

    //add Review
    const addReviews = async (req: Request, res: Response) => {
        const { date,reviewerId,movieId, rating, image, text } = req.body
        try {
            const movie = await Movie.findById(movieId);
            const user = await User.findById(reviewerId);
            const newReview = new Review({ date,reviewerId,movieId, rating, image, text });
            const savedReview = await newReview.save();
            console.log(user);
            if (!movie || !user) {
                res.send("Movie or user not found");
                return;
            }
            movie.reviews.push(savedReview.id);
            user.reviews.push(savedReview.id);

            await Movie.findByIdAndUpdate(movie._id, movie);
            await User.findByIdAndUpdate(user._id, user);
            res.send(savedReview);
        } catch (err) {
            console.error(err);
        }
    }

    const updateReview = async (req: Request, res: Response) => {
        const { _id, date,reviewerId,movieId, rating,likes, image, text } = req.body;
        const newReview = await Review.findByIdAndUpdate(_id, { date,reviewerId,movieId, rating,likes, image, text } , { new: true });
        res.send(newReview);
        console.log("update succeded");
    }

    const deleteReview = async (req: Request, res: Response) => {
        const { _id } = req.params;
        const deletedReview = await Review.findById(_id);
        if (deletedReview) {
            await Movie.updateOne(
                { _id: deletedReview.movieId },
                { $pull: { reviews: _id } }
            );
            await Review.findByIdAndDelete(_id);
            res.send("Review deleted")
            console.log("Review deleted");
        }
        else {
            res.send("Review not found");
            console.log("Review not found");
        }
    }

    export default {
        getReviews,
        getReviewById,
        addReviews,
        updateReview,
        deleteReview,
    };