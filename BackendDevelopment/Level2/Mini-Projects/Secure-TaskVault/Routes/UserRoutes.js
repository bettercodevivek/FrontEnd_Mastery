const {Signup,Login,RefreshToken} = require('../Controllers/UserController');

const express = require('express');

const UserRouter = express.Router();

UserRouter.post('/signup',Signup);

UserRouter.post('/login',Login);

UserRouter.get('/refresh',RefreshToken);


module.exports = UserRouter;