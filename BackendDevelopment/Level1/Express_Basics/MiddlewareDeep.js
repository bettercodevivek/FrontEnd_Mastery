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

