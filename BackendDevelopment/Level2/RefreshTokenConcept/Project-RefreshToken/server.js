const express = require('express');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

const app = express();

const cookieparser = require('cookie-parser');

const User = require('./UserModel');
const AuthMiddleware = require('./AuthMiddleware');

const PORT = 8080;

const ACCESS_SECRET_KEY = 'qwerty1234';

const REFRESH_SECRET_KEY = 'abcdef1234';

app.use(express.json());

app.use(cookieparser());


// establishing connection with DB

mongoose.connect("mongodb://localhost:27017/")
.then(()=>{
  console.log("Connection with DB Successful !")
})
.catch((err)=>{
  console.error(err.message)
})


app.post('/signup',async(req,res)=>{
          const {username,email,password} = req.body;
    try{

    if(!email || !username || !password){
        return res.status(401).json({error:"All credentials need to be filled !"})
    }

    const newUser = new User({email,username,password});

    await newUser.save();

    res.status(201).json({
        message:"Sign Up successful !",
        user:{
            username:newUser.username,
            email:newUser.email
        }
    })
    }
    catch(err){
        res.status(500).json({error:"Internal Server Error !"})
    }
});

app.post('/login',async(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(401).json({error:"fill both the credentials !"});
    }

    const user = await User.findOne({email});

    if(!user){
        return res.status(400).json({error:"User not found !"})
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.status(400).json({error:"Wrong password entered !"})
    }

    const payload = {
        userId:user._id,
        email:user.email,
        username:user.username
    }

    const accessToken = jwt.sign(payload,ACCESS_SECRET_KEY,{expiresIn:"45s"});

    const refreshToken = jwt.sign(payload,REFRESH_SECRET_KEY,{expiresIn:"7d"});

    res.cookie('refreshToken',refreshToken,{
        httpOnly:true,
        sameSite:"strict",
        secure:false,
        maxAge:7*24*60*60*1000
    })

    res.status(200).json({
        message:"Login Successful !",
        token:accessToken
    })
})

app.post('/refresh-token',async(req,res)=>{

  const refreshToken = req.cookies.refreshToken;

  if(!refreshToken){
    return res.status(400).json({error:"No Refresh Token !"});
  }

  try{

   const decoded = jwt.verify(refreshToken,REFRESH_SECRET_KEY);

   const newAccessToken = jwt.sign({
    userId:decoded.userId,email:decoded.email
   },ACCESS_SECRET_KEY,{expiresIn:"45s"});
    
   res.status(200).json({accessToken:newAccessToken});

  }
  catch(err){
    res.status(500).json({error:"Internal Server Error !"});
  }

})

app.get('/profile',AuthMiddleware,(req,res)=>{
   res.status(200).json({message:"welcome to your profile :",user:req.user})
})

app.listen(PORT,()=>{
    console.log("Server Started at :", PORT);
})