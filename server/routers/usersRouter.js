const { Router } = require("express");
const { registerUser, loginUser, updateCompletedTasks } = require("../controllers/usersController");

const usersRouter = new Router();

usersRouter.post("/register", registerUser);
usersRouter.post("/login", loginUser);
usersRouter.post("/checklist", updateCompletedTasks); 

module.exports = { usersRouter };
