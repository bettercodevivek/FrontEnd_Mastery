const express = require('express');

const mongoose = require('mongoose');

const app = express();

const PORT = 8080;

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/")
.then(()=>{
    console.log("MongoDB Connected Successfully !");
})
.catch((err)=>{
   console.error(err);
})

app.listen(PORT,()=>{
    console.log("Server started boss !")
})

// Theek hai yaar toh ab na thoda samajhte hai ki yeh sab chal kya raha hai aakhir

// first things first , mongoDB ko samajhte hai :- 

// Toh mongoDB is a NOSQL Database , which means SQL database ki tarah isme data tables ki form mein store nahi hoga.
// rather here data is stored in form of something called a "document", every document is in JSON.

// MongoDB Cluster
// │
// └── Database (e.g., test)
//      │
//      └── Collection (e.g., notes)
//            │
//            └── Document (1 note)
//                 {
//                   "_id": "661abc...",
//                   "title": "Buy milk",
//                   "content": "Need to buy milk from the store"
//                 }

// ab simple samjho structure ko :-
// Database hai ---> uske andar collection hoga like table in SQL ( for example notes ka ek collection hoga) ---> collection ke andar
// har ek jo note ya user ki details hongi woh ek document hoga,basically like a record in SQL.

// Mongoose is a library that:

//     Simplifies interaction with MongoDB from Node.js.

//     Adds schema + model system to MongoDB (which is schema-less by default).

//     Gives us:
//     Validation
//     Default values
//     Middleware hooks
//     Clean API to write/read/update data.

// ab schema aur model samajh:-

// dekho, har ek document is basically hamari ek entry in our collection, yaani aise samajh ki ek record, ab record ke kya attributes honge
// woh hum schema se batate hai, yaha column ya rows toh hai nahi, isliye schema basically defines how each document or record is gonna 
// look like.

// Model — Yeh hota hai factory + toolkit jisse hum kaam karte hain

// Socho tumne schema se ek design bana liya user ka.
// Ab tum chahte ho ki:

//     naye users bana sako

//     users ko find kar sako

//     kisi user ko delete/update kar sako

// Toh yeh sab karne ke liye, tumhe model banana padta hai from that schema.

// basically dekh, abhi DB se pehle we were either using memory array or a json file to perform mock CRUD operations, waha hum
// helper functions use kar rahe the jo file ops perform kar rahe the using fs module, but ab kyuki actual DB hai humare paas, we
// dont need to use fs module, and thus model humare saare CRUD operations perform karne mein use hota hai