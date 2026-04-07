const express = require('express');
const cors = require('cors');

// Require routers here
const reviewsRouter = require("./routers/reviews")
const usersRouter = require('./routers/users');

const api = express();

api.use(cors());
api.use(express.json());

// Use routers here
api.use("/reviews", reviewsRouter)
api.use("/user/", usersRouter)

module.exports = api