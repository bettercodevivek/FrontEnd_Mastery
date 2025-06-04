// Here we will write the handler functions for the user routes
// generally we have three user routes =>  signup, login and refreshToken

require('dotenv').config();

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const User = require('../Models/UserModel');

// Signup handler function

const Signup = async(req,res) => {

   try{
     const {username,email,password} = req.body;

    console.log(req.body);

    if(!username || !email || !password){
        return res.status(401).json({error:"All credentials should be filled !"})
    }

    const userExists = await User.findOne({email});

    if(userExists){
        return res.status(400).json({error:"This user already exists ! Please Login"})
    }

    const newUser = new User({username,email,password});

    await newUser.save();

    res.status(201).json({
        message:"New User Created Successfully !",
        user:{
            username:newUser.username,
            email:newUser.email
        }
    });

   }
   catch(err){
    res.status(500).json({error:"Internal Server Error !"})
   }
    
}

// login handler function

const Login = async(req,res) => {

    try{
        const {email,password} = req.body;

    if(!email || !password){
        return res.status(401).json({error:"All credentials need to filled !"});
    }

    const user = await User.findOne({email});

    if(!user){
        return res.status(404).json({error:"This user doesnt exist ! Please signup first !"})
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.status(404).json({error:"invalid Password !"})
    }

const payload = {
    username:user.username,
    email:user.email,
    userId:user._id
}

const AcceptToken = jwt.sign(payload,process.env.ACCESS_SECRET_KEY,{expiresIn:"2m"});

const refreshToken = jwt.sign(payload,process.env.REFRESH_SECRET_KEY,{expiresIn:"7d"});

res.cookie('refreshToken',refreshToken,{
    httpOnly:true,
    sameSite:"strict",
    maxAge:7*24*60*60*1000
});

res.status(200).json({
    message:"Login successful ! Tokens generated successfully !",
    token:AcceptToken 
})
    }
    catch(err){
        res.status(500).json({error:"Internal server error !"})
    }
}

// Now refresh token path for refreshing the acceptance token once it gets expired !

const RefreshToken = async(req,res) => {

    try{
       const refresh_token = req.cookies.refreshToken;
    
    console.log(refresh_token);

    const decoded = jwt.verify(refresh_token,process.env.REFRESH_SECRET_KEY);

    if(!decoded){
        return res.status(409).json({error:" Token verification failed !"})
    }

    const payload = {
        username: decoded.username,
        email:decoded.email,
        userId:decoded.userId
    }

    const newToken = jwt.sign(payload,process.env.ACCESS_SECRET_KEY,{expiresIn:"2m"});

    res.status(200).json({
        message:"New Accept token generated successfully !",
        token:newToken
    });
    }
    catch(err){
        res.status(500).json({error:"Internal Status Error !"})
    }
     
}

module.exports = {Signup,Login,RefreshToken} ;