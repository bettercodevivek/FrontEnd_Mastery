// Authentication middleware => yeh check karega ki access token theek hai ya nahi, this middleware will be used for every protected route
// of tasks

require('dotenv').config();

const jwt = require('jsonwebtoken')

const AuthMiddleware = (req,res,next) => {
    
   try{
     
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({error:"Access token not found in header !"})
    }

    const token = authHeader.split(' ')[1];

    const decoded_token = jwt.verify(token,process.env.ACCESS_SECRET_KEY);

    // if(!decoded_token){
    //     return res.status(400).json({error:"Token Verification failed !"})
    // }

    req.user = decoded_token;

    next();

   }
   catch(err){
       next(err);
   }

}

module.exports = AuthMiddleware;