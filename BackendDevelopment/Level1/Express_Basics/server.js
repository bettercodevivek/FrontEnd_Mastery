// creating first express server

const express = require('express');

const app = express();

const PORT = 3000;

app.use(express.json());

app.get('/',(req,res)=>{
    console.log(`request logger => request at URL :- ${req.url} and method:-${req.method}`)
    res.status(200).send("Welcome to my First Express Server !")
});

app.get('/about',(req,res)=>{
    console.log(`request logger => request at URL :- ${req.url} and method:-${req.method}`)
    res.status(200).send("Welcome to About Page !")
});

app.listen(PORT,()=>{
    console.log(`Server started at PORT : ${PORT}`)
});


// let us understand about route parameters now  

// toh basically jo url hota hai hamara, it can be dynamic too, something like this :- /users/:id, here :id is a route parameter.
// basically route ka jo dynamic part hoga that is a route parameter


app.get('/about/:id',(req,res)=>{
    const userId = req.params.id;
    // we can access route parameters using req.params
    res.status(200).send(`you requested about of id : ${userId}`)
})