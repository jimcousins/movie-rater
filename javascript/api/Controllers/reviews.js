const Review = require("../Models/Review")

async function userReviews(req, res){
    try{
        const user_id = req.params.user_id
        const reviews = await Review.getAllByUserID(user_id)
        res.status(200).json(reviews)
    } catch(err){
        res.status(404).json({"error":err.message})
    }
}

async function newReview(req, res){
    try{
        const userData = req.body
        const newRev = await Review.createReview(userData)
        res.status(201).json(newRev)
    } catch(err){
        res.status(500).json({"error":err.message})
    }
}

module.exports = { userReviews, newReview }