// Now, we will create this middleware that will validate the jwt created at login , for every protected route

const jwt = require('jsonwebtoken');

const SECRET_KEY = 'abcdef1234';

const express = require('express');

const app = express();

app.use(express.json());

const AuthMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({error:"Header not found !"})
    }
       
    const token = authHeader.split(" ")[1];

    try{
        const decode = jwt.verify(token,ACCESS_SECRET_KEY);

        req.user = decode;

        next();
    }
    catch(err){
        res.status(403).json({error:"Invalid or expired token !"})
    }
}

module.exports = AuthMiddleware;