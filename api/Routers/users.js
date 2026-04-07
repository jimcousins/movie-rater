const { Router } = require("express")

const usersController = require("../controllers/users")

const usersRouter = Router()

usersRouter.get("/id/:user_id", usersController.userByID)
usersRouter.get("/email/:email", usersController.userByEmail)
usersRouter.post("/", usersController.newUser)

module.exports = usersRouter