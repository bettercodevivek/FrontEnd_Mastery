const express = require('express');

const router = express.Router();

const {CreateNote,getNotes} = require('../Controllers/NoteController');

router.post('/notes',CreateNote);

router.get('/notes',getNotes);

module.exports = router;