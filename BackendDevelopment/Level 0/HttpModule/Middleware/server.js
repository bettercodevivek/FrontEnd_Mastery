// Lets get started with middlewares now !

// ab simple humne samjha ki normally client-server relationship mein abhi tak, client HTTP request send kar raha tha and
// humara server uska response de raha tha, ab aisa samjho ki inke beech ek 3rd person aajaye like a middleman.

// That is exactly what a middleware is

// Middleware ka simple matlab hota hai:

// "Beech ka insaan jo aane wali request (req) aur jaane wali response (res) ke beech mein kuch kaam kare."

// Aur phir decide kare:

//     Request ko aage bhejna hai ya

//     Response khud yahin se dena hai.

// Real life analogy:

//     Client request bhejta hai: "Bhai mujhe pizza chahiye!"

//     Middleware: "Theek hai pehle check karta hoon ki paisa diya ya nahi."

//     Agar paisa diya: next() call, toh pizza bana ke de dete.

//     Agar nahi diya: Middleware yahi se res.end("No money, no pizza!") kar deta.

// Matlab:

//     Agar middleware mein next() nahi bulaaya → request aage nahi jaayegi.

//     Agar next() bulaaya → request next step tak jaayegi (ya route handler tak).

// syntax

// function testMiddleware(req,res,next){
//       // some operation
//     //next()
// }

const http = require('http');

// middleware function for logging

function logger(req,res,next){
    console.log(`request recieved at:${new Date().toLocaleString()}, on path : ${req.url} with method : ${req.method}`);
    next();
}

const server = http.createServer((req,res)=>{
         logger(req,res,()=>{
              if(req.url === "/" && req.method === 'GET'){
                     res.writeHead(200,{'content-type':'application/json'})
                     res.end(JSON.stringify({message:"Welcome to Homepage of testing middleware !"}))
              }
              else{
                res.writeHead(404,{'content-type':'application/json'})
                res.end(JSON.stringify({error:"Couldnt fetch homepage !"}))
              }
         })
})

server.listen(8000,()=>{
    console.log("server started at port:8000")
})