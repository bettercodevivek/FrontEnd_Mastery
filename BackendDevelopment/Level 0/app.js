
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

