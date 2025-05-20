const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    content:{
        type:String,
        required:true,
    },
    user:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Note = mongoose.model('Note',NoteSchema);

module.exports = Note;
