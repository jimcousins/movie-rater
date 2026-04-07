const { Router } = require("express")

const reviewsController = require("../Controllers/reviews")

const reviewsRouter = Router()

reviewsRouter.get("/:user_id", reviewsController.userReviews)
reviewsRouter.post("/", reviewsController.newReview)

console.log("Router is routing");

module.exports = reviewsRouter