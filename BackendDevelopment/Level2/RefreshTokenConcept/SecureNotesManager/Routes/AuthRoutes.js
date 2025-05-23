const express = require('express');

const router = express.Router();

const {Signup,login,refreshToken} = require('../Controllers/UserController');

router.post('/signup',Signup);

router.post('/login',login);

router.get('/refresh-token',refreshToken);

module.exports = router;