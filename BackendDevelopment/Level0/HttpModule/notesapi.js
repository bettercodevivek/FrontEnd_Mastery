// We’ll build a local HTTP server that supports these routes and methods:

// Method        | Route            | Purpose
// GET           | /notes           | Get all notes
// GET           | /notes/:id       | Get a single note by ID
// POST          | /notes           | Add a new note
// DELETE        | /notes/:id       | Delete a note by ID


const fs = require('fs/promises');
const http = require('http');
const {parse} = require('url');

// yaha pe parse from url module is being used to break the url into parts, and it looks like this :- 

// {
//     pathname: '/notes/1',
//     query: {}, // if any ?key=value are there
//     ...
//   }
  // so we can extract pathname property directly from the url 

// Now , sabse pehle we will implement an async function that gets all the notes and and shows in form of JSON as response.

async function getAllNotes(){
    try {
      const data = await fs.readFile('notes.json','utf-8');
      return JSON.parse(data || "[]");
    }
    catch(err){
        console.log("An error occured",err)
    }
}

// helper function to save notes

async function SaveNewNote(Note){
    const notes = await getAllNotes();
    notes.push(Note);
    await fs.writeFile("notes.json",JSON.stringify(notes,null,2),'utf-8');
}

// helper function to rewrite file as to delete desired note from notes.json

async function SaveAllNotes(notes){
        await fs.writeFile("notes.json",JSON.stringify(notes,null,2),"utf-8");
}

const server = http.createServer(async(req , res)=>{
    const parsedUrl = parse(req.url,true);
    const method = req.method;
    const path = parsedUrl.pathname;
     console.log(` Request Recieved at URL : ${path} and HTTP Method used : ${req.method}`);
     if(path === "/" && method === 'GET'){
        res.writeHead(200,{'content-type':'text/plain'})
        res.end("This is the Homepage of Notes API")
     }
     else if(path === '/notes' && method === 'GET'){
        const notes = await getAllNotes();
        res.writeHead(200,{'content-type':'application/json'})
        res.end(JSON.stringify(notes));
     }
     else if(path.startsWith('/notes/') && method === 'GET'){
        const id = path.split('/')[2];
        const notes = await getAllNotes();
        // const note = notes.find(n => n.id === id)
        //so, iss line ki wajah se ek error aa rha tha, note exist karne ke bawjood it was showing note not found, it is because in json file
        // id is number whereas here it may be a string and === compares with type to, so quick fix is this :-
        // n=> n. id == id or n=>n.id === Number(id)
        const note = notes.find(n => n.id === Number(id));
        if(note){
            res.writeHead(200,{'content-type':'application/json'});
            res.end(JSON.stringify(note))
        }
        else{
            res.writeHead(404,{'content-type':'text/plain'})
            res.end('Note Not Found !')
        }
     }
     else if(path === "/notes" && method === "POST"){
         let body = " ";
         req.on("data",(chunk)=>{
            body+=chunk.toString();
         })
         req.on("end",async()=>{
            try{
              const note =JSON.parse(body)
              await SaveNewNote(note);
              res.writeHead(200,{'content-type':'application/json'})
              res.end(JSON.stringify({message:"Saved a note successfully",note}))
            }
            catch(err){
                res.writeHead(404,{'content-type':"application/json"})
                res.end(JSON.stringify({error:"Error occurred in creating a new note"}))
            }
         });
     }
     else if(path.startsWith('/notes/') && method === 'DELETE'){
       const id = path.split('/')[2];
       const AllNotes = await getAllNotes();
       const filteredNotes = AllNotes.filter(note => note.id !== Number(id));
       if(filteredNotes.length === AllNotes.length){
          res.writeHead(404,{'content-type':'application/json'});
          res.end(JSON.stringify({error:"Note Not Found,Hence json file unchanged"}))
       }
       else{
          await SaveAllNotes(filteredNotes);
           res.writeHead(200,{'content-type':'application/json'})
           res.end(JSON.stringify({message:"Note Successfully Deleted !"}))
       }
     }
     else if(path.startsWith('/notes/') && method === "PATCH"){
        let body = " "
        const id = path.split('/')[2];
        request.on("data",(chunk)=>{
          body+=chunk.toString();
        })
        request.on("end",async()=>{
            try{
                
            }
            catch{

            }
        })
     }
})


// In the code above, we have stored the result of async getAllnotes() in the conditional block only when '/notes' is the path,
// this is because, we want the operation to run only when someones tries to get all notes on /notes path, agar isse conditional
// block se bahar karde, it will run everytime  irrespective of the path, causing delay and inefficient usage of resources.
// If you store it outside the else-if block, getAllNotes() will run even when not needed, which is inefficient and bad practice.

server.listen(3000,()=>{
    console.log("Server started at port : 3000")
});

// Note :- In res.writeHead(), we give 2 args, first is the status code and second is the content-type, now content-type helps
// client (browser) understand what type of content is the server sending and deal with it accordingly, there are several types:-

// 1. text/plain

// 2. application/json

// 3. application/javascript

// 4. text/html

// 5. image/png or image/jpeg

// 6. multipart/form-data

// Now, let us understand POST Requests properly.

// toh get request mein koi request body nahi hoti, because isme hum server se data sirf fetch kar rahe hai, so no need for request body.
// When a POST request is sent, the data doesn't come in req.url, it comes in the request body.
// But here’s the twist:
//     In pure Node.js HTTP module, the body doesn't come in one piece.
//     You have to manually collect chunks of data as they come in.
//     THEN parse it.

// but aisa kyu http module mein ?
// In Node.js (using http module), every incoming request and response is treated as a stream.
// And a stream is like a pipeline of data — it sends or receives data piece by piece (called chunks) instead 
// of waiting for everything at once.

// why do this ?
// Efficiency:
// Data could be HUGE — imagine uploading a video or a file. Waiting to receive the whole thing before processing = memory overload.

// Non-blocking:
// Node is single-threaded — if it waits for the whole body to come in one go, it blocks everything else.

// Streaming Power:
// Node was literally built to handle streaming data. That's its strength. Reading large JSON, uploading files, etc. — it all benefits from this chunked system.

// req.on("data", chunk => { ... });
// req.on("end", () => { ... });

// here (data,callback) is used when recieving data chunks and adding them to body
// (end,callback) is used when recieved all data chunks and then parse and save full body.


// toh yaar ab yaha pe kuch cheezein samajhte hai
// sabse pehle to ek simple sa doubt yeh ho raha hai ki hum async function jo likh rahe hai ( helper function ) like getAllNotes()
// toh ofc function ke andar to await karenge hi, because iss await ka purpose simple hai it will wait for async operation to complete
// and then store the result, but when we call this function again in our required if-block , then jab await laga rahe hai, uska purpose
// hai ki woh hume actual answer dede, agar woh na lagaye toh async ek promise object return karega.

// Kyunki getAllNotes() khud ek Promise return karta hai.

// Aur agar tu usko await nahi karega, toh notes variable mein pura Promise object aajayega, actual data nahi.

// Tujhe actual mein file ka content chahiye na (i.e., notes array)?

// Isiliye firse await lagana padta hai jab tu usko call karega.