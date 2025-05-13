// const express = require('express');

// const mongoose = require('mongoose');

// const app = express();

// const PORT = 8080;

// app.use(express.json());

// mongoose.connect("mongodb://localhost:27017/")
// .then(()=>{
//     console.log("MongoDB Connected Successfully !");
// })
// .catch((err)=>{
//    console.error(err);
// })

// app.listen(PORT,()=>{
//     console.log("Server started boss !")
// })

// Theek hai yaar toh ab na thoda samajhte hai ki yeh sab chal kya raha hai aakhir

// first things first , mongoDB ko samajhte hai :- 

// Toh mongoDB is a NOSQL Database , which means SQL database ki tarah isme data tables ki form mein store nahi hoga.
// rather here data is stored in form of something called a "document", every document is in JSON.

// MongoDB Cluster
// │
// └── Database (e.g., test)
//      │
//      └── Collection (e.g., notes)
//            │
//            └── Document (1 note)
//                 {
//                   "_id": "661abc...",
//                   "title": "Buy milk",
//                   "content": "Need to buy milk from the store"
//                 }

// ab simple samjho structure ko :-
// Database hai ---> uske andar collection hoga like table in SQL ( for example notes ka ek collection hoga) ---> collection ke andar
// har ek jo note ya user ki details hongi woh ek document hoga,basically like a record in SQL.

// Mongoose is a library that:

//     Simplifies interaction with MongoDB from Node.js.

//     Adds schema + model system to MongoDB (which is schema-less by default).

//     Gives us:
//     Validation
//     Default values
//     Middleware hooks
//     Clean API to write/read/update data.

// ab schema aur model samajh:-

// dekho, har ek document is basically hamari ek entry in our collection, yaani aise samajh ki ek record, ab record ke kya attributes honge
// woh hum schema se batate hai, yaha column ya rows toh hai nahi, isliye schema basically defines how each document or record is gonna 
// look like.

// Model — Yeh hota hai factory + toolkit jisse hum kaam karte hain

// Socho tumne schema se ek design bana liya user ka.
// Ab tum chahte ho ki:

//     naye users bana sako

//     users ko find kar sako

//     kisi user ko delete/update kar sako

// Toh yeh sab karne ke liye, tumhe model banana padta hai from that schema.

// basically dekh, abhi DB se pehle we were either using memory array or a json file to perform mock CRUD operations, waha hum
// helper functions use kar rahe the jo file ops perform kar rahe the using fs module, but ab kyuki actual DB hai humare paas, we
// dont need to use fs module, and thus model humare saare CRUD operations perform karne mein use hota hai


// Now, we will write the complete code to perform CRUD operations on notes collection using model

const express = require('express');

const mongoose = require('mongoose');

const app = express();

const PORT = 8080;

const Note = require('./models/Note');

app.use(express.json())  // application level(for every route) json parsing middleware lagadiya , built-in hai yeh.

// connecting the DB

mongoose.connect("mongodb://localhost:27017/")
.then(()=>{
  console.log(`DB Connection successfully established !`)
})
.catch((err)=>{
  console.error(`An error occurred while connecting DB : ${err}`)
});

// POST Request 

app.post('/notes',async(req,res)=>{
    
  try{
     const { title , content} = req.body ;

    if(!title || !content){
      return res.status(404).json({message:"both title and content must be present !"})
    }
    
    const newNote = new Note({title,content})
    const SavedNote = await newNote.save();

    res.status(201).json(
      {
        message:"New note Created !",
        Note:SavedNote,
      }
    )
  }
  catch(err){
    console.error("An error occurred while creating note !",err.message);
    res.status(500).json({error:"Error creating Note !"})
  }
});


// GET Request

app.get('/notes',async(req,res)=>{
  try{
  const notes = await Note.find();
    res.status(200).json(notes);
  }
  catch(err){
    res.status(404).json({error:err});
  }
});


// GET request per id

app.get('/notes/:id',async(req,res)=>{
  try{
    const id = req.params.id;
  const note = await Note.findById(id);
  if(!note){
    return res.status(404).json({error:"Note doesnt exist !"})
  }
  res.status(200).json({
    message:"Note found",
    note:note
  });
  }
  catch(err){
    res.status(500).json({error:"An error occurred"});
  }
})

// PUT Request

app.put('/notes/:id',async(req,res)=>{
  try{
    const id = req.params.id;
  const {title,content} = req.body;
  const UpdatedNote = await Note.findByIdAndUpdate(id,
    {title,content},
    {new:true,runValidators:true}
  );
  if(!UpdatedNote){
    res.status(404).json({error:"Note not found !"})
  }

  res.status(200).json({message:"Note Updated Successfully!",note:UpdatedNote});
  }
  catch(err){
    res.status(500).json({error:"An error occurred while updating this resource !"})
  }
});

// findByIdAndUpdate()  === 	Finds note by ID and updates it
// { new: true } ===	Returns the updated note instead of the old one
// { runValidators: true } ===	Ensures Mongoose schema validation runs during update


// DELETE Request

app.delete('/notes/:id',async(req,res)=>{
  try{
    const id = req.params.id;
    const DeletedNote = await Note.findByIdAndDelete(id);

    if(!DeletedNote){
      return res.status(404).json({error:"Note doesnt exist !"});
    }

    res.status(200).json({message:"Note Deleted Successfully !", note:DeletedNote})
  }
  catch(err){
      res.status(500).json({error:"Error occurred in deleting the requested resource !"})
  }
})

app.listen(PORT,()=>{
  console.log(`SERVER STARTED AT PORT : ${PORT}`)
});