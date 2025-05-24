const Note = require('../Models/NoteModel');

// Post handler for new notes

const CreateNote = async(req,res) => {

    try{
      const {title,content} = req.body;

    console.log(req.body);

    if(!title || !content){
        return res.status(404).json({error:"All credentials are necessary !"})
    }

    const newNote = new Note({title,content,user:req.user.userId});

    // yaha ek mistake yeh hui thi ki, if we want ki hum notes ko user-based access de, we need to store userId along with note too in DB
    // we were only sending it as a reponse earlier and not storing it above, leading to getting no notes in get request 

    await newNote.save();

    res.status(201).json({
        message:"New Note Created Successfully !",
        note:{
            title:newNote.title,
            createdAt:newNote.createdAt,
            user:req.user.userId
        }
    });
    }
    catch(err){
      res.status(500).json({error:"Internal Server Error !"})
    } 
}

// get all notes handler 

const getNotes = async(req,res) =>{
   try{
    const notes = await Note.find({user:req.user.userId});

    if(!notes.length){
        return res.status(401).json({error:"No notes found !!"})
    }

    res.status(200).json({
        message:"Here are your notes",
        notes:notes
    })
   }
    catch(err){
        res.status(500).json({error:"Internal Server Error !"})
    }
}

module.exports = {CreateNote,getNotes};