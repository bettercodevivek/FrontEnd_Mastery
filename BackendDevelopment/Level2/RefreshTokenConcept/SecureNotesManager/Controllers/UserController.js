const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../Models/UserModel');

const Signup = async(req,res) => {
    try{
      const {username,email,password} = req.body;

    if(!username || !email || !password){
        return res.status(401).json({error:"All Fields are mandatory !"})
    }

    const newUser = new User({username,email,password});

    console.log(newUser);

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

const login = async(req,res) => {

    try{
     const {email,password} = req.body ;

    if(!email || !password){
        return res.status(401).json({error:" Fill all the credentials !"})
    }

    const user = User.findOne({email});

    if(!user){
        return res.status(409).json({error:"user doesnt exist, kindly login first !"});
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.status(400).json({error:"Invalid Password !"})
    }

    const payLoad = {
        userId:user._id,
        username:user.username,
        email:user.email
    }

    const accessToken = jwt.sign(payLoad,process.env.ACCESS_SECRET_KEY,{expiresIn:"1m"});

    const refreshToken = jwt.sign(payLoad,process.env.REFRESH_SECRET_KEY,{expiresIn:"7d"});

    res.cookie("refreshToken",refreshToken,{
      httpOnly:true,
      sameSite:"strict",
      maxAge:7*24*60*60*1000
    });

    res.status(200).json({
        message:"User login successful !",
        token:accessToken
    })
    }
    catch(err){
        res.status(500).json({error:"Internal Server Error !"})
    }
}

module.exports = {Signup,login} ;