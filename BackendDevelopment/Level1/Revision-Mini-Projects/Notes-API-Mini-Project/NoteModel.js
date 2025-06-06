const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        unique:true,
        required:true,
        lowercase:true
    },
    content:{
        type:String,
        required:true
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

const Note = mongoose.model('Note',noteSchema);

module.exports = Note;