const { Router } = require('express');
const { usersController } = require('../controllers/usersController');

const usersRouter = new Router();

usersRouter.get('/',usersController.getUsers);
usersRouter.get('/:id',usersController.getUsers);
usersRouter.post('/', usersController.registerUser);
// booksRouter.get('/', booksController.getBooks);
// booksRouter.get('/:id', booksController.getBook);
// booksRouter.post('/', booksController.addBook);
// booksRouter.put('/:id', booksController.updateBook);
// booksRouter.delete('/:id', booksController.deleteBook);

module.exports = { usersRouter };
