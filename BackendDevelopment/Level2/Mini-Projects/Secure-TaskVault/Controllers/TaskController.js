// now we will write all the handler functions for the task routes

const Task = require("../Models/TaskModel");

const createTask = async(req,res) => {
    try{ 

       const {title,content} = req.body;

       if(!title || !content){
        return res.status(402).json({error:"Title and content cannot be empty !"})
       }

       const newTask = new Task({title,content,createdBy:req.user.userId});

       await newTask.save();

       res.status(201).json({
        message:"New Task Created Successfully !",
        task:{
           title:newTask.title,
           content:newTask.content
        }
       });

    }
    catch(err){
         res.status(500).json({error:"Internal Server Error !"})
    }
}

// Viewing all tasks 

const ViewTasks  = async(req,res) => {
    try{

        const tasks = await Task.find({createdBy:req.user.userId});

        if(tasks.length === 0){
            return res.status(404).json({error:"No tasks associated with this user are available !"});
        }

        res.status(200).json({
            message:"Your tasks are here : ",
            tasks:tasks
        })
    }
    catch(err){
        res.status(500).json({error:"Internal Server Error !"});
    }
}

module.exports = {createTask,ViewTasks};