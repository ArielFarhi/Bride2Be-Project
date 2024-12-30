const { Router } = require("express");
const { registerUser, loginUser } = require("../controllers/usersController");

const usersRouter = new Router();

usersRouter.post("/register", registerUser);
usersRouter.post("/login", loginUser);

module.exports = { usersRouter };
