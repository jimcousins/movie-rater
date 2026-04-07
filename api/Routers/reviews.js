const { Router } = require("express")

const reviewsController = require("../controllers/reviews")

const reviewsRouter = Router()

reviewsRouter.get("/:user_id", reviewsController.userReviews)
reviewsRouter.post("/", reviewsController.newReview)

module.exports = reviewsRouter