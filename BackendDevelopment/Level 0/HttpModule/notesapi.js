// We’ll build a local HTTP server that supports these routes and methods:

// Method        | Route            | Purpose
// GET           | /notes           | Get all notes
// GET           | /notes/:id       | Get a single note by ID
// POST          | /notes           | Add a new note
// DELETE        | /notes/:id       | Delete a note by ID


const fs = require('fs/promises');
const http = require('http');
const {parse} = require('url');

// Now , sabse pehle we will implement an async function that gets all the notes and and shows in form of JSON as response.

async function getAllNotes(){
    const data = await fs.readFile("notes.json","utf-8");
    return JSON.parse(data || "[]");
}

const server = http.createServer(async(req , res)=>{
    const parsedUrl = parse(req.url,true);
    const method = req.method;
    const notes = await getAllNotes();
     console.log(` Request Recieved at URL : ${req.url} and HTTP Method used : ${req.method}`);
     if(parsedUrl === "/" && method === 'GET'){
        res.writeHead(200,{'content-type':'text/plain'})
        res.end("This is the Homepage of Notes API")
     }
     else if(parsedUrl === '/notes' && method === 'GET'){
        res.writeHead(200,{'content-type':'application/json'})
        res.end(JSON.stringify(notes));
     }
})


server.listen(8080,()=>{
    console.log("Server started at port : 8080")
});