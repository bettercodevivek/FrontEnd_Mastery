const jwt = require('jsonwebtoken');

const AuthMiddleware = (req,res,next) => {
 try{
    const AuthHeader = req.headers.authorization;

  if(!AuthHeader || !AuthHeader.startsWith("Bearer ")){
    return res.status(401).json({error:"Token not found in header !"})
  }

  const token = AuthHeader.split(" ")[1];

  const decoded = jwt.verify(token,process.env.ACCESS_SECRET_KEY);

  if(!decoded){
    return res.status(404).json({error:"Token Verification Failed !"})
  }

  req.user = decoded;

  next();
 }
 catch(err){
    next(err);
 }

}

module.exports = AuthMiddleware;