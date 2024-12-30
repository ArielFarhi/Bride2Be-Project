const { Router } = require('express');
const { checklistTasksController } = require('../controllers/checklistsController');

const checklistRouter = new Router();

checklistRouter.get('/',checklistTasksController.getChecklistTask);

module.exports = { checklistRouter };