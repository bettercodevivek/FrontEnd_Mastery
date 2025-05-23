const express = require('express');

const router = express.Router();

const {Signup,login} = require('../Controllers/UserController');

router.post('/signup',Signup);

router.post('/login',login);

module.exports = router;