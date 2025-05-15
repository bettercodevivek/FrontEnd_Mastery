const express = require('express');

const mongoose = require('mongoose');

const User = require('./UserModel');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const PORT =8080;

const SECRET_KEY = "qwerty123456";

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

// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   console.log(req.body);
//   try {
//     // user sends email and password
//     const user = await User.findOne({ email });
     
//     console.log(user)

//     if (!user) {
//       return res.status(404).json({
//         error: "Uhh ohh ! This user doesn't exist! Kindly sign up first."
//       });
//     }
//      console.log("Password from DB:", user.password);

//     const isMatch = await bcrypt.compare(password, user.password);
      
//     console.log(isMatch)

//     if (!isMatch) {
//       return res.status(401).json({ error: "Wrong Password!" });
//     }

//     res.status(200).json({
//       message: "Login Successful!",
//       user: {
//         username: user.username,
//         email: user.email
//       }
//     });

//   } catch (err) {
//     res.status(500).json({ error: 'Server Error!' });
//   }
// });


// Now, we will learn about JWTs and how to implement them.

// but before implementation it is important to understand what they are and why are they even needed in the first place :- 

// JWT stands for JSON Web Tokens, ab bilkul layman lang mein samajh.

// Jab user login karleta hai normally kisi website pe, toh fir agar usse dusre kisi protected route ko access karna ho like dashboard
// toh baar baar server ko authenticate karna padega and wohi authentication wala process chalega , which can be long, not optimal for server
// as well as client, baar baar yeh check karna ki banda yeh logged in hai ya nahi by running credentials through DB is very non-optimal

// Agar JWT na ho toh:
//     Har baar jab user kisi secure route pe jaata hai (like /profile, /orders, /dashboard), server ko check karna padega:
//     "Yeh banda kaun hai?"
//     "Kya yeh login hai ya nahi?"
//     Iske liye phir session banana padta, cookies maintain karni padti — server pe load badhta.

// isliye iss problem ko resolve karne ke liye banaya gaya JWT ka concept, now JWT is like a digital pass.

// JWT ek portable proof of login hai — ek baar user login kare, toh:

//     Usko JWT milta hai (like an Admit Card)

//     JWT ke andar uski ID, email, aur kuch aur info hoti hai

//     Jab bhi wo kisi protected route pe jaye, wo JWT dikhata hai

//     Server JWT verify karta hai → agar valid hai toh access granted

// JWT ≠ Login
// JWT = Proof ki user login ho chuka hai
// → Toh user ko baar-baar login karne ki zarurat nahi
// → Server ko state maintain karne ki zarurat nahi

// So, JWT ka implementation 3 steps mein hoga =>

//  step-1 : Login route updation to generate JWT when login is successful

app.post('/login',async(req,res)=>{
  const { email,password} = req.body;
  try{
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({error:"Sorry this user doesnt exist, please register first !"});
    }
    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
      return res.status(409).json({error:"Sorry ! Wrong Password "})
    }

    // JWT create karenge ab after isMatch is true

    const payload = {
      id:user._id,
      email:user.email
    }

    const token =  jwt.sign(payload,SECRET_KEY,{expiresIn:'1h'});

    res.status(200).json({
      message:"Login Successful ! ",
      token:token,
      user:{
        username:user.username,
        email:user.email
      }
    });
  }
  catch(err){
    res.status(500).json({error:"Internal Server Error !"})
  }
})

// ab login pe user ko ek token mil jaayega, but uss token ka usage hai ki woh verify kara jaa sake, toh ab har protected route pe
// yeh token hum verify kar sake uske liye, we will write a middleware.

// Request aane pe JWT verify karna, Agar valid hai toh hi request aage jaayegi

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if token is present
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token found!" });
  }

  const token = authHeader.split(" ")[1]; // Bearer <token>

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // user info ab request ke saath available
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired token!" });
  }
};

// ab final step hai, to run this middleware on all protected routes, let us see and example :- 

app.get('/profile', verifyToken, async (req, res) => {
  // req.user contains the decoded user info from token
  res.status(200).json({
    message: "Welcome to your profile!",
    user: req.user
  });
});


app.listen(PORT,()=>{
    console.log(`Server started at PORT : ${PORT}`)
});


// IMP POINT :- /profile jab hum postman mein run kar rahe hai, we are getting a successful response but when it comes to
// browser, waha still we are getting an error, because, postman mein hum manually headers mein authorization mein bearer <token> set kar
// rahe hai, whereas browser mein aisa automatically hota nahi hai , and manually karne ke liye frontend side , jab fetch karenge
// route ko, tab header mein store karna padega token,aise localstorage mein hojayega store.