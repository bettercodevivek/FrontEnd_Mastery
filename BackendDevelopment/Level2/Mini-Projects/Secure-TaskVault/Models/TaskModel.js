// writing the task schema for creating task model

const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        lowercase:true
    },
    content:{
        type:String,
        required:true,
        lowercase:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        enum:['pending','completed','in-progress'],
        default:'pending'
    }
});

const Task = mongoose.model('Task',TaskSchema);

module.exports = Task;