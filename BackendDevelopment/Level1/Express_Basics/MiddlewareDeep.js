// Toh before moving ahead with middlewares in express js, let us do a quick recap of what middlewares are :- 

// middlewares basically woh functions hai jo hum apni request response cycle ke beech mein laga dete hai,
// yaani jab bhi client side se koi request aayegi pehle uska access middleware pe hoga and usse process karega, before sending it ahead
// ab ek middleware function pe basically 3 things hoti hai :-
// req object 
// res object
// next() function

// next() function is very important, har middleware apna task karne ke baad, apne se agla handler run karta hai by this next()
// if this is not returned, request cycle ruk jaayegi and error aajyega.

// ab different types ke middlewares samajhte hai

// 1. APPLICATION LEVEL MIDDLEWARE 

// Ye wo middleware hai jo saare incoming requests ke liye apply hota hai → chahe wo /, /about, /api/users, ya koi bhi route ho.
// Ye globally lagta hai.

// express mein isse app.use() se lagate hai

// example :- app.use(express.json())  , yeh application level middleware hai because yeh har request pe lagega irrespective of the method
// and route of the request 

// Example Code :- 

const express = require('express');

const app = express();

const PORT = 8080;


app.use((req,res,next)=>{
  console.log(` Request has been made at URL: ${req.url} and METHOD used: ${req.method} at TIME: ${new Date().toLocaleString()} using IP: ${req.ip}`)
  next();
})

app.get('/',(req,res)=>{
    res.status(200).send("Welcome to the homepage of middleware testing server !")
})

app.listen(PORT,()=>{
    console.log(`Server started running at PORT: ${PORT}`)
})


// Now, some important points to remember about application level middlewares :- 

// 1. order of  middleware matters => jo middleware pehle likha jaayega woh pehle execute hoga
// app.use(middleware1)
// app.use(middleware2)
// yaha phle middleware1 chalega fir middleware2

// 2. Tum application-level middleware ko kisi specific path pe bhi laga sakte ho:

//    app.use('/api',(req,res,next)=>{
//     console.log('This middleware runs only on /api routes');
//     next();
//    })

// Ab ye middleware sirf /api aur uske sub-routes pe chalega!

// yaani application level middleware application level hone ke bawjood bhi specific route pe chala sakte hai

// 3.  Middleware me response bhej diya toh next middleware/route nahi chalega!

//  app.use((req,res,next)=>{
//      if (!req.headers['x-auth']) {
//         return res.status(401).send('Unauthorized!');
//     }
//     next();
//     });

// Agar x-auth header nahi mila → response bhej diya → flow yahin ruk gaya.
//  next() nahi chala → aage ke routes kabhi nahi milenge, because yeh simple hai bhaut, response agar middleware hi send kar raha hai
// iska simple meaning yehi hai ki request couldnt pass through middleware perfectly !

// 2. ROUTE SPECIFIC MIDDLEWARES

//  As the name suggests, yeh woh middlewares hai jo hum kisi particular route pe lagayenge bas !

// example:- 

const myLogger = (req,res,next) =>{
    console.log(`This Request is being logged by MyLogger --- URL:${req.url} and METHOD: ${req.method}`);
    next();
}

const myLogger2 = (req,res,next) => {
    console.log(`This is MyLogger2 and this proves that multiple middlewares can be written for the same route`);
    next();
}

app.get('/about',myLogger,myLogger2,(req,res)=>{
    res.status(200).send("Welcome to the about page !")
})

// Toh 2 imp cheezein :- specific route ke liye uska middleware path aur handler function ke beech mein lagaya jaa sakta hai
// and path aur handler function ke beech jitne chahe utne middlewares lagaye jaa sakte hai

// similarly, ek hi middleware multiple routes pe lagaya jaa sakta hai

// Also, agar multiple middlewares lagane hai ek route pe, array of those middlewares can also be given

// const mw1 = (req, res, next) => { console.log('mw1'); next(); };
// const mw2 = (req, res, next) => { console.log('mw2'); next(); };

// app.get('/multi', [mw1, mw2], (req, res) => {
//     res.send('Multiple middleware!');
// });

// Now, built-in and 3rd party middlewares in express js

// Express kuch middleware already provide karta hai → hume install ya define nahi karna padta → bas use karna padta hai.

// Examples:

// Built-in Middleware	                 Kaam kya karta hai

// express.json()	                     JSON body ko parse karta hai → req.body me set karta hai
// express.urlencoded()	                 URL-encoded data parse karta hai (form data ke liye)
// express.static()	                     Static files serve karta hai (images, CSS, JS, etc.)

// app.use(express.static('public'));

// Ab tum public folder ke andar jo bhi file rakho → browser me /filename pe access kar sakte ho.

// 3rd party => Ye middleware npm se install kiye jaate hain → additional functionality ke liye.

// example of morgan :- 

// const morgan = require('morgan');

// app.use(morgan('dev'));

// bas yeh jo upar likha hai, yeh saari requests likhne se pehle likhdena tabhi it will work.

// ERROR HANDLING MIDDLEWARES

// ek normal middleware function 3 args leta hai => (req,res,next)
// whereas ek error handling middleware function 4 args leta hai => (err,req,res,next) 
// isme err argument is for error , Express automatically isko call karta hai jab koi error hota hai ya tum next(error) likhte ho.

// ab important cheez yeh hai ki, yeh order of middlewares mein sabse end mein lagaya jaata hai, infact after all routes 
// because agar routes se pehle likh diya isse, toh normal requests pe bhi error handler lagega

// example code :-

// const express = require('express');
// const app = express();

// app.get('/', (req, res) => {
//     res.send('Hello!');
// });

// app.get('/error', (req, res, next) => {
//     const err = new Error('Something went wrong!');
//     err.statusCode = 400;
//     next(err);
// });

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(err.statusCode || 500).json({
//         error: err.message
//     });
// });

// app.listen(3000, () => {
//     console.log('Server running on port 3000');
// });

// yaha pe ab sabse bada doubt yehi aayega ki, hum error middleware tak pohochenge kaise, like what events will lead to execution of
// error handling middleware

// toh pehle toh yeh samjho ki, we will not use next(err) in any normal middleware, means => if our middleware is something simple like
// a logger middleware, toh usme koi check ya authentication nahi hai, which means, its pretty simple and it wont throw any error

// whereas if we write a middleware jiska purpose hai to authenticate, it simply means, it can have 2 possible outcomes => either the
// authentication will be success or not, in the case if its success, we will simply move to next middleware with next(), but if it fails
// we will run next(err)

// ab next(err) karta yeh hai ki, it will immediately skip all the next middleware and handlers and go straight to tha last error handling
// middleware that we have written, and woh chal jaayega.

// toh use case samjho, error handling middleware call hi woh middleware ya handler karega jaha koi check lag raha ho.

// 1. Normal Middleware

// app.use((req, res, next) => {
//     console.log("This is just a logger middleware.");
//     next(); // no error → normal flow
// });


// 2. Check karne wala

// app.use((req, res, next) => {
//     if (!req.headers.authorization) {
//         const err = new Error("Unauthorized: No token provided!");
//         err.statusCode = 401;
//         return next(err);  // → ONLY if error happens, jump to error middleware
//     }
//     next(); // → else continue normally
// });


// 3. Ek aur tarika (async task)

// Agar middleware ke andar asynchronous kaam hai (e.g. DB query, file read) → aur waha koi exception/failure aaya → tab bhi hum next(err) likhte hain.

// app.use(async (req, res, next) => {
//     try {
//         const user = await getUserById(req.query.id);
//         if (!user) {
//             const err = new Error("User not found!");
//             err.statusCode = 404;
//             return next(err);
//         }
//         req.user = user;  // attach user to req
//         next();
//     } catch (err) {
//         next(err); // any unexpected error → pass to error middleware
//     }
// });


// toh bhai → isliye har middleware ko “error throwing middleware” nahi banana chahiye!

// Bas jis middleware me failure hone ke chances hain → wahi pe conditional ya try-catch ke andar next(err) use karna hota hai.

//  baaki ke middleware me direct next() likhte hain.