const http = require('http');

// Ab samjho kya hai, yeh http module jo hai, it is a built-in module of node js and IMP THING IS THAT IT IS BUILT ON TOP OF
// Net Module of node js, which itself is a low level tcp server.

// const server = http.createServer(callback)

// When you call http.createServer(callback), internally:

// Node sets up a TCP server.

// Every time an HTTP request comes in (like from browser or Postman), it wraps the TCP stream into IncomingMessage (req) and ServerResponse (res) objects.

// These two are passed to your callback function.

// The actual code goes like this :-

// const server = http.createServer((req,res)=>{
//     console.log(`request recieved :- Method - ${req.method} and URL - ${req.url}`)

//     res.writeHead(200,{'content-type':'text/plain'});
//     res.end("Hello from Vivek's first server !")
// })

// server.listen(3000,()=>{
//     console.log("Server Started at Port: 3000");
// });

// ab upar yeh jo callback hai createServer() mein, isme yeh (req,res)=>{} , jo hai it signifies the following:-

// it is just a normal callback - not a promise, so its simply a sync code

// ab req is actually an object of class = http.IncomingMessage , contains info from client side, because simple hai
// client request karta hai server se.

// res is actually an object of class = http.ServerResponse , used by server to send response to client side

// createServer() is not an async function by default but uske andar jo callback hai, we can make that an async if need arises.

// let us understand how we can create multiple routes 

// When you create a server with Node's native http module, you handle routing manually. This means:

// You check the req.url and req.method.

// Based on the URL (and sometimes method), you respond differently.

// example code for manual multiple routes :- 


const server = http.createServer((req,res)=>{
    if(req.url === '/' && req.method === 'GET'){
      res.writeHead(200,{"content-type":"text/plain"})
      res.end("This is the homepage of vivek's server !")
    }
    else if(req.url === '/about' && req.method === 'GET'){
        res.writeHead(200,{"content-type":"text/plain"})
        res.end("This is the about page of vivek's server !")
    }
    else if(req.url === '/contact' && req.method === 'GET'){
        res.writeHead(200,{"content-type":"text/plain"})
        res.end("This is the contact page of vivek's server !")
    }
})

server.listen(3000,()=>{
    console.log("Server started on port : 3000")
})

// here listen function takes the port number and a callback function. 

// it works in this way = "Start listening for incoming requests on this port!"

// What it does:

// Binds the server to the specified port.

// Keeps the process running so it can handle future incoming requests.

// Executes the callback when the server is ready to accept requests (not when a request is received).

