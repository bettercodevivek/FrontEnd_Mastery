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

// function logger(req,res,next){
//     console.log(`request recieved at:${new Date().toLocaleString()}, on path : ${req.url} with method : ${req.method}`);
//     next();
// }

// const server = http.createServer((req,res)=>{
//          logger(req,res,()=>{
//               if(req.url === "/" && req.method === 'GET'){
//                      res.writeHead(200,{'content-type':'application/json'})
//                      res.end(JSON.stringify({message:"Welcome to Homepage of testing middleware !"}))
//               }
//               else{
//                 res.writeHead(404,{'content-type':'application/json'})
//                 res.end(JSON.stringify({error:"Couldnt fetch homepage !"}))
//               }
//          })
// })

// server.listen(8000,()=>{
//     console.log("server started at port:8000")
// })


// toh middleware ke concept mein ek important cheez samajhni zaroori hai, ki middleware flow mein kaha aata hai :- 

// toh generally and by default :- middleware hum request object pe hi lagate hai meaning ki, koi request aayi, uspe aapne kuch
// middleware lagaye like logging, authorization and then finally it goes to server and a response is generated.

// toh yaani middleware response ke saath kuch interference nahi karta, it only and only works and interferes with the request incoming
// from the client.

// Request mein middleware kuch bhi modify ya check kar sakta hai (headers badalna, auth check, etc.)

// Response ke baad woh kuch nahi karega, jab tak specially aisa kuch na likha ho (e.g., setting some response headers just before sending).

// MIDDLEWARE CHAINING

// Chaining ka simple matlab hota hai:

//     Ek se zyada middleware ko line-by-line sequence mein run karna.

//     Har middleware ka next() function hota hai,
//     jo next middleware ko call karta hai.

//     If you don't call next(), request wahi atak jaayegi.


// aasan language mein ek ke baad ek middlewares lagana ki ek chain si create hojaye, just like promise chaining.

// example :- 

// middleware 1

function logger1(req,res,next){
  console.log(`loggin request at ${req.url} and ${req.method}`);
  next();
}

// middleware2

function authorize(req,res,next){
  console.log("authorization under process !");
  next();
}

// middleware3

function handleRequest(req,res,next){
  console.log("Handle Request Executed !")
  if(req.url === '/' && req.method === "GET"){
    res.writeHead(200,{'content-type':'application/json'})
    res.end(JSON.stringify({message:"Homepage of middleware testing server !"}))
  }
  else{
    res.writeHead(404,{'content-type':'application/json'})
    res.end(JSON.stringify({error:"Error occurred at homepage !"}))
  }
}

// const server=http.createServer((req,res)=>{
//   authorize(req,res,()=>{
//     logger1(req,res,()=>{
//       handleRequest(req,res);
//     })
//   })
// })

// server.listen(8080,()=>{
//   console.log('Server Started at port:8080')
// })

// middlware chaining challenge

// middleware 1

function logger2(req,res,next){
  console.log(`request made at path:${req.url} and using method:${req.method} at time : ${new Date().toLocaleString()}`);
  next();
}

// middleware 2

function Timer(req,res,next){
  const start = Date.now();
  res.on('finish',()=>{
    const end = Date.now();
    console.log(`Time Taken to Process Request : ${end-start}ms`)
  })
  next();
}

// middleware 3

function finalHandler(req,res,next){
  if(req.url === "/" && req.method === "GET"){
    res.writeHead(200,{'content-type':'application/json'});
    res.end(JSON.stringify({message:"Challenge for middlewares homepage !"}))
  }
  else{
    res.writeHead(404,{'content-type':'application/json'})
    res.end(JSON.stringify({error:"error aagya bro !"}))
  }
}

// const server = http.createServer((req,res)=>{
//   logger2(req,res,()=>{
//     Timer(req,res,()=>{
//       finalHandler(req,res);
//     });
//   });
// })

// server.listen(8080,()=>{
//   console.log("Server started at port : 8080")
// })


//  A VERY IMPORTANT TOPIC TO UNDERSTAND AND STUDY, VERY VERY IMPORTANT :-

// ab dekho we learnt ki normally http module use karke jab middlewares use karte hai, toh multiple middlewares ke case mein
// chaining karni padti hai, and humne kya kara middleware functions likhe and fir manually chaining karni padi inside the createServer()
// function , callback hell jaisa lagta hai jo because of nested callbacks.

// ab express js jo hota hai, woh differently work karta hai, woh aise chaining nahi karta, uske under the hood middleware chaining ki 
// functionality different hoti hai and bhaut efficient bhi. let us see how it happens under the hood in express js :-

// 1. An array to store all middleware functions

const middlewares = [];

// 2. A custom 'use' function, that will take a middleware function as an argument and just push it in the above array

function use(mw){
  middlewares.push(mw);
}

// 3. A function to run middlewares one by one, basically by looping on the middlewares array 

function runMiddleware(req,res){
  let index  = 0;
  function next(){
    const middleware = middlewares[index];
    index++;
    if(middleware){
      middleware(req,res,next);
    }
  }
  next();
}

// 4. Now, create middlewares to register in use() function

// middleware 1

function logger(req,res,next){
  console.log(`Request made by client at URL:${req.url} and by method: ${req.method}`);
  next();
}

// middleware 2

function authorize(req,res,next){
  console.log("Authorization under process !");
  next();
}

// middleware 3

function ResponseHandler(req,res,next){
  if(req.url === '/' && req.method === 'GET'){
    res.writeHead(200,{'content-type':'application/json'});
    res.end(JSON.stringify({message:"Learning Express style middleware chaining"}));
  }
}

// use(logger);
// use(authorize);
// use(ResponseHandler)

// const server = http.createServer((req,res)=>{
//   runMiddleware(req,res);
// })

// server.listen(8080,()=>{
//   console.log('Server started at port : 8080');
// })


// Now we will import and use our customRouter class to mimick functioning of express server

const Router = require('./router')

const router = new Router();

router.get('/home',(req,res)=>{
  res.writeHead(200,{'content-type':'application/json'});
  res.end(JSON.stringify({message:"Hello from custom router home !"}))
})

const server = http.createServer((req,res)=>{
  router.handle(req,res);
});

server.listen(8080,()=>{
  console.log("Server started at port : 8080");
})