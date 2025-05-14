const express = require('express');

const mongoose = require('mongoose');

const User = require('./UserModel');

const bcrypt = require('bcryptjs');

const PORT =8080;

const app = express();

app.use(express.json());

// connecting the DB

mongoose.connect('mongodb://localhost:27017/')
.then(()=>{
    console.log("Connection wtih DB established successfully !")
})
.catch((err)=>{
      console.error("Error while connecting DB : ",err)
});

app.post('/signup',async(req,res)=>{
    try{
       const {username,email,password} = req.body;

    // check if all fields are present

    if(!username || !email || !password){
        return res.status(404).json({error:"All fields are mandatory to fill !"})
    }

    // check if user already exists or not

    const userExists = await User.findOne({email});

    if(userExists){
        return res.status(409).json({message:"User already exists !"});
    }

    const newUser = new User({username,email,password});

    await newUser.save();

    res.status(201).json({
        message:"User Created Successfully !",
        user:{
            id:newUser._id,
            email:newUser.email,
            username:newUser.username
        }
    });
    }
    catch(err){
        res.status(500).json({error:"An error occurred while registering new user !"})
    }
});

// now we will write a login route, to test password verification using bcryptjs

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    // user sends email and password
    const user = await User.findOne({ email });
     
    console.log(user)

    if (!user) {
      return res.status(404).json({
        error: "Uhh ohh ! This user doesn't exist! Kindly sign up first."
      });
    }
     console.log("Password from DB:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
      
    console.log(isMatch)

    if (!isMatch) {
      return res.status(401).json({ error: "Wrong Password!" });
    }

    res.status(200).json({
      message: "Login Successful!",
      user: {
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {
    res.status(500).json({ error: 'Server Error!' });
  }
});


app.listen(PORT,()=>{
    console.log(`Server started at PORT : ${PORT}`)
});