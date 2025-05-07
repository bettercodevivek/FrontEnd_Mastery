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

app.get('/users/:name',(req,res)=>{
    const UserName = req.params.name;
    res.status(200).send(`The Requested User's name is :- ${UserName}`);
})

// very important point here => req.params and req.query are not methods of request object  but they are properties, because we dont need to execute
// anything here, they just store parsed data.

// Query Params

// Query parameters are key-value pairs you send in the URL after the ? mark.

app.get('/users/',(req,res)=>{
    // const {term,sort} = req.query;
    console.log(req.query)
    res.status(200).send(`you searched for term : ${term} and sorted by : ${sort}`)
})

// so here's an important point for this query params, just like route parameters variable name jo hai woh humare URL pe depend karega
// aasan bhasha mein, jaisa agar ek URL hai :- "localhost:3000/users/:idNumber" , toh yaha req.params karenge toh automatically uski ek
// property idNumber suggest hone lagegi because req object can read the url , similarly jab URL aisa hoga :- "localhost:3000/users?name=vivek&age=22",
// in this case req.query ko console.log karne pe hume properties ki key values milengi name and age, yaani url meij jo key hoti hai
// wohi use hoti hai, kuch predefined name nahi hota properties ka in objects ke andar.


// Let us understand req.body now

// Jab client POST ya PUT request bhejta hai, toh aisi request mein jo body hoti hai woh empty nahi hoti GET Request ki tarah
// rather inki request mein data hota hai, this data can be :- JSON, Form Data , Raw Text
// toh jab yeh body server pe aati hai hume iss data ko read karna hota hai
// and this can be done by req.body

// But there's a catch , express ko khud nahi pata ki incoming request body mein jo data hai uska type kya hoga, so it needs a
// middleware jo incoming data ko parse karke JS Object Banade.

// isliye code mein hamesha yeh line add hoti hai:- 

// app.use(express.json())

// bina iske req.body undefined hi reh jaayega


// toh ek example code lelete hai POST request ka to understand req.body

app.post('/notes',(req,res)=>{
    console.log(req.body);

    const {title,content} = req.body;

    if(!title || !content){
       return res.status(400).json({error:"Title and Content should Exist !"})
    }

    res.status(201).json({message:"Note created successfully!",note:{title,content}});
});