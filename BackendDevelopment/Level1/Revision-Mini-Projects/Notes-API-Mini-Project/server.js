require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const User = require('./UserModel');

const cookieparser = require('cookie-parser');

const app = express();

const AuthMiddleware = require('./AuthMiddleware');

const Note = require('./NoteModel');

const SECRET_KEY = process.env.SECRET_KEY;

const PORT = process.env.PORT;

// sabse pehle ek application level built-in middleware implement kardete hai

app.use(express.json());

app.use(cookieparser());

// so we need to build a notes api : meaning CRUD operations of notes, login and signup with jwt.

// Establish a connection with DB first

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("Established Connection with DB Successfully !")
})
.catch((err)=>{
 console.log("An Error Occurred While connecting with DB : ",err)
});

// We will write the home (/) GET route first

app.get('/',(req,res)=>{
    res.status(200).json({message:"WELCOME TO THE HOME PAGE OF NOTES API !"})
});

// we will write (/signup) POST route now

app.post('/signup',async(req,res)=>{
  try{
  const {username,email,password} = req.body;
   console.log(req.body);
      if(!username || !email || !password){
    return res.status(409).json({error:"Enter All Credentials"});
   }

   const userExists = await User.findOne({email});

   if(userExists){
    return res.status(404).json({error:"This user already exists, kindly login !"})
   }
    
   const newUser = new User({username,email,password});

   await newUser.save()

   res.status(201).json({
    message:" Signup Successful !",
    user:{
      username:newUser.username,
      email:newUser.email
    }
   });
    }
    catch(err){
      res.status(500).json({error:"Internal Server Error !"})
    }
})


// we will write login (POST) route now

app.post('/login',async(req,res)=>{

 const {email,password} = req.body;
 console.log(req.body);

 try{
  
   if(!email || !password){
    return res.status(400).json({error:"Fill Both the credentials !"})
   }

   const user = await User.findOne({email});

   if(!user){
    return res.status(404).json({error:"This user doesn't exist, Please SignUp First !"})
   }

   const isMatch = await bcrypt.compare(password,user.password);

   if(!isMatch){
    return res.status(404).json({error:"Wrong Password !"})
   }

   const payload = {
    userId:user._id,
    username:user.username,
    email:user.email
   }

   const accessToken = jwt.sign(payload,process.env.ACCESS_SECRET_KEY,{expiresIn:"15m"})

   const refreshToken = jwt.sign(payload,process.env.REFRESH_SECRET_KEY,{expiresIn:"7d"})

  // Send refreshToken in a secure HttpOnly cookie

   res.cookie("refreshToken",refreshToken,{
    httpOnly:true,
    secure:true, // true only if using https
    sameSite:"strict",
    maxAge:7*24*60*60*1000,
   })

   // Why HttpOnly Cookie? Frontend JS can't access it (prevents XSS).
    
   res.status(200).json({
    message:"Login Successful !",
    user:{
      token:accessToken,
      username:user.username,
      email:user.email
    }
   });
 }
 catch(err){
  res.status(500).json({error:"Internal Server Error !"});
 }
})

// Add a new route '/refresh-token' 

app.post('/refresh-token',async(req,res)=>{
  const token = req.cookies.refreshToken;
  
   if(!token){
    return res.status(400).json({error:"Refresh Token Missing !"})
   }

   try{

    const decoded = jwt.verify(token,process.env.REFRESH_SECRET_KEY);

    const payload = {
      userId:decoded.userId,
      email:decoded.email
    }

    const newToken = jwt.sign(
     payload,
     process.env.REFRESH_SECRET_KEY,
     {expiresIn:"15m"}
    );

    res.status(200).json({accessToken:newToken})

   }
   catch(err){
    res.status(403).json({error:"Invalid Refresh Token !"})
   }
})

// now we will start with notes routes and we will apply authmiddleware to each route as each route is protected in this scenario

app.post('/notes',AuthMiddleware,async(req,res)=>{
    const {title,content} = req.body;
    try{
      
      if(!title || !content){
        return res.status(401).json({error:"Both Fields need to be filled !"})
      }

      const newNote = new Note({
        title,
        content,
        user:req.user.userId
      });

      await newNote.save();
       
      res.status(201).json({
        message:"New Note Created Successfully !",
        note:{
          title:newNote.title,
          content:newNote.content,
          user:newNote.user
        }
      });
    }
    catch(err){
        res.status(500).json({error:"Internal Server Error !"})
    }
});

app.get('/notes',AuthMiddleware,async(req,res)=>{
  try{
    const notes = await Note.find({user:req.user.userId}); // filter notes by user

  if(!notes){
    return res.status(400).json({error:"No notes found !"})
  }

  res.status(200).json({
    message:"Here are Your notes boss !",
    notes
  })
  }
  catch(err){
    res.status(500).json({error:"Internal Server Error !"})
  }
});



// GET route for dynamic routes

app.get('/notes/:id',AuthMiddleware,async(req,res)=>{
try{
  const id = req.params.id;
   
  const note = await Note.findById(id);
  
  if(!note){
    return res.status(404).json({error:"Note not found !"})
  }
  
  res.status(200).json({
    message:"Note found !",
    note
  });
}
catch(err){
  res.status(500).json({error:"Internal Server Error !"})
}
})

// PUT request for updating a note completely

app.put('/notes/:id',AuthMiddleware,async(req,res)=>{
try{
   const id = req.params.id;

const {title,content} = req.body;

const note = await Note.findById(id);

if(!note){
  return res.status(404).json({error:"Note Doesn't exist !"})
}

if(note.user.toString() !== req.user.userId){
  return res.status(403).json({error:"unauthorized update attempt !"})
}

const updatedNote = await Note.findByIdAndUpdate(id,{title,content},{new:true});

res.status(201).json({
  message:"Note updated Successfully !",
  updatedNote:updatedNote
})
}
catch(err){
  res.status(500).json({error:"Internal Server Error !"})
}
})

// DELETE route for note 

app.delete('/notes/:id',AuthMiddleware,async(req,res)=>{
      try{
        const id = req.params.id;
       
        const note = await Note.findById(id);

        if(!note.user.toString() !== req.user.UserId){
          return res.status(403).json({error:"Unauthorized Delete Attempt !"})
        }
  
        await note.deleteOne();

      res.status(200).json({
        message:"Note Deleted Successfully !",
        note:deletedNote
      });
      }
      catch(err){
        res.status(500).json({error:"Internal Server Error !"})
      }
});

app.listen(PORT,()=>{
  console.log(`Server successfully started at PORT : ${PORT}`)
});
