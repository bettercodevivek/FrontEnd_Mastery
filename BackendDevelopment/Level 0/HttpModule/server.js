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

// We will now learn about HTTP Methods . So, basically there are 4 major http methods used:-

// 1. GET - Used to fetch data
// 2. POST - Used to create new data
// 3. PUT - used for updating existing data
// 4. DELETE - used to remove data 

// Basically, simple language mein bole toh => client side ko jab interact karna hota hai server se, toh HTTP Methods use hote hai,
// to tell server ki client ko kya chaiye. For example:-
// 1. GET - client ko existing data chaiye server se
// 2. POST - client ko new data server mein add karvana hai
// 3. PUT - client kisi data ko puri tarah replace karna chahta ho
// 4. PATCH - client kisi data ka sirf koi particular portion update karna chahta hai
// 5. DELETE - client kisi data ko delete karna chahta hai

// 1. GET

if(req.method === 'GET' && req.url === '/products'){
    // fetch xyz data
}

// characteristics :- 

// 1. No body in request
// 2. idempotent ( Yaani yeh request chahe 1 baar karo ya 10 baar, result will be same every single time )

// 2. POST

if(req.method === 'POST' && req.url === '/createUser'){
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const parsed = JSON.parse(body);
      // Save to DB or file
    });
}

// characteristics :-

// 1. has body (usually JSON)

// 2. used for form submissions, user registrations

// 3. not idempotent(posting same data twice = multiple records)

// 3. PUT

// characteristics

// 1. idempotent
// 2. full replacement of resource

// 4. PATCH

// characteristics

// 1. only modifies specific fields

// 2. More efficient for partial updates