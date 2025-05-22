const jwt = require('jsonwebtoken');

const ACCESS_SECRET_KEY = "qwerty1234";

const AuthMiddleware = (req,res,next) => {

   const authHeader = req.headers.authorization;

   if(!authHeader || !authHeader.startsWith("Bearer")){
    return res.status(404).json({error:"Token Missing !"})
   }

   const token = authHeader.split(" ")[1];

    try{
     
     const decoded = jwt.verify(token,ACCESS_SECRET_KEY);

     req.user = decoded;

     next();

    }
    catch(err){
        res.status(403).json({error:"Invalid or expired Access Token !"})
    }
}

module.exports = AuthMiddleware;