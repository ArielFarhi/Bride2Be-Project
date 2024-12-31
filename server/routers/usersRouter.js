const { Router } = require("express");
const { registerUser, loginUser, updateCompletedTasks, getUserById } = require("../controllers/usersController");

const usersRouter = new Router();

usersRouter.post("/register", registerUser);
usersRouter.post("/login", loginUser);
usersRouter.post("/checklist", updateCompletedTasks);
usersRouter.get("/:userId", getUserById); 

module.exports = { usersRouter };
