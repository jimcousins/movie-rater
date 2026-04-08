const express = require('express');
const cors = require('cors');

// Require routers here
const reviewsRouter = require("./Routers/reviews")

const api = express();

api.use(cors());
api.use(express.json());

// Use routers here
api.use("/reviews", reviewsRouter)

module.exports = api