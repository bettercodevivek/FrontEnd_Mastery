const AuthMiddleware = require('../Middlewares/AuthMiddleware');

const {createTask,ViewTasks} = require('../Controllers/TaskController');

const express = require('express');

const TaskRouter = express.Router();

TaskRouter.post('/tasks',AuthMiddleware,createTask);

TaskRouter.get('/tasks',AuthMiddleware,ViewTasks);


module.exports = TaskRouter;