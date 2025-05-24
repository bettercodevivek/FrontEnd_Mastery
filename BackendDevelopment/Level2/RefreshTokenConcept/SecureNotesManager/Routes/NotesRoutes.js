const express = require('express');

const router = express.Router();

const {CreateNote,getNotes} = require('../Controllers/NoteController');

const AuthMiddleware = require('../Middlewares/AuthMiddleware')

router.post('/notes',AuthMiddleware,CreateNote);

router.get('/notes',AuthMiddleware,getNotes);

module.exports = router;