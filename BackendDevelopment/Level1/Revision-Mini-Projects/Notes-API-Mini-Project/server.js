const express = require('express');

const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const app = express();

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
  
})


app.listen(PORT,()=>{
  console.log(`Server successfully started at PORT : ${PORT}`)
});
