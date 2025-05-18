const express = require('express');

const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const User = require('./UserModel');

const app = express();

const AuthMiddleware = require('./AuthMiddleware');
const Note = require('./NoteModel');

const SECRET_KEY = "abcdef1234"

const PORT = 8080;

// sabse pehle ek application level built-in middleware implement kardete hai

app.use(express.json());

// so we need to build a notes api : meaning CRUD operations of notes, login and signup with jwt.

// Establish a connection with DB first

mongoose.connect('mongodb://localhost:27017/')
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

   const token = jwt.sign(payload,SECRET_KEY,{expiresIn:"1h"})
    
   res.status(200).json({
    message:"Login Successful !",
    user:{
      token:token,
      username:user.username,
      email:user.email
    }
   });
 }
 catch(err){
  res.status(500).json({error:"Internal Server Error !"});
 }
})

// now we will start with notes routes and we will apply authmiddleware to each route as each route is protected in this scenario

app.post('/notes',AuthMiddleware,async(req,res)=>{
    const {title,content} = req.body;
    try{
      
      if(!title || !content){
        return res.status(401).json({error:"Both Fields need to be filled !"})
      }

      const newNote = new Note({title,content});

      await newNote.save();
       
      res.status(201).json({
        message:"New Note Created Successfully !",
        note:{
          title:newNote.title,
          content:newNote.content
        }
      });
    }
    catch(err){
        res.status(500).json({error:"Internal Server Error !"})
    }
})

app.listen(PORT,()=>{
  console.log(`Server successfully started at PORT : ${PORT}`)
});
