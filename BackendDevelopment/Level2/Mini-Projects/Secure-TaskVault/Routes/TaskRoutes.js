const AuthMiddleware = require('../Middlewares/AuthMiddleware');

const {createTask,ViewTasks} = require('../Controllers/TaskController');

const express = require('express');

const TaskRouter = express.Router();

TaskRouter.post('/create',AuthMiddleware,createTask);

TaskRouter.get('/view',AuthMiddleware,ViewTasks);


module.exports = TaskRouter;