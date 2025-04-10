
// Why is Node. js so important for backend development ?

// simple answer => JS is single threaded and we have already understood how it can perform single task at once and also js is
// synchronous by default nature , par Node uses event loop to handle thousands of connections at once = super fast.

// writing first node js program

console.log("hello i am node js")

// toh abhi yaha pe yeh code run karne mein special kya hua hai, how is it different than the js code that runs in browser
// well its not different in terms of lang or syntax but you ran js outside of browser, basically chrome's v8 engine
// is the base of node js, so when you run this command in cli "node file_name.js" , your code is fed to v8 engine.

// Node wraps our code in a function that looks like this :- 

// (function(exports, require, module, __filename, __dirname) {
//     // your code here
//  });

// first mini task => write a script to log:

    // The current file name

    // The current directory path

    // The platform you’re on (Windows/Linux/Mac)

    // Total system memory

const os = require("os")
const { default: Add } = require("./func");
console.log(Add(50,43))
let file_name = __filename;
let dir_name =  __dirname;
let platform = os.platform()
let sys_mem = os.totalmem()

const result= Add(50,32);
console.log(result)

console.table({file_name,dir_name,platform,sys_mem})


// ab upar yeh example thoda complex lag raha hoga, because here we ran into something called modules:- toh simple bhasha mein samjahte hai ki
// yeh common js aur es module kya hai

// dekh bro, jab aap multiple files ke saath work karte ho, certain times aapko kisi dusre file ke functions current file mein use karne pad sakte hai
// and uske liye aap uss file ko import karte ho, toh yehi module system hai, large code ko small parts mein break karke , import export karke use karna

// CommonJS aur ES Modules = bas 2 different styles / tarike to use other JS files inside your main file.
// Jaise ki jab tu ek feature ko alag file mein likhta hai, aur usse import karta hai — that’s a module system.

// CommonJS	Ye Node.js ka default module system hai (jab tak tu type: module nahi lagata)

// ES Modules	Ye modern JS browsers ka style hai (ES6 se aaya) — aur ab Node mein bhi aagaya, but you have to enable it

// example of how importing and exporting files work in cjs => {
// math.js
// const add = (a, b) => a + b;
// module.exports = { add };

//  app.js
// const { add } = require('./math');
// console.log(add(2, 3)); // 5 }

// example of how importing and exporting files work in esm => { math.js
// export function add(a, b) {
//     return a + b;
//   }
  
//   // app.js
//   import { add } from './math.js';
//   console.log(add(2, 3)); // 5
//   }


// Abhi ke liye we will be using common js system

