const { Router } = require('express');
const { registerUser } = require('../controllers/usersController');

const usersRouter = new Router();

usersRouter.post('/register', registerUser);

module.exports = { usersRouter };
