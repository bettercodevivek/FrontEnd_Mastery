// Here, we will write the NoteSchema which is basically the structure in which every single note will get stored as.
// and from that schema we will create a mongoose model , model helps us to perform all kinds of operations on DB.

const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    Title:{
        type:String,
        unique:true,
        required:true
    },
    content:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    // yeh important hai, this means ki hum har note ke saath kis user ne woh note create kara hai yeh bhi store kar rahe hai,
    // so that sirf apne notes ko hi har user access kar sake.
    // and har user ki unique id hogi isliye type : mongoose.Schema.Type.ObjectId

    createdAt:{
        type:Date,
        default:Date.now
    }
});

const NoteModel = mongoose.Model('Note',NoteSchema);

module.exports = NoteModel;