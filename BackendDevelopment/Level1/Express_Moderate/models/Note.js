const mongoose = require('mongoose');

const NoteSchema = ({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
});

const Note = mongoose.model('Note',NoteSchema);

module.exports = Note;
