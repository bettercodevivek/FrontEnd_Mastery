const name1 = "John Doe" ;

// const AlertBtn = document.getElementById('alert-btn');

// const Head1 = document.getElementById('head-1');

// let userName=prompt("Enter Your Name BOSS!!");


// AlertBtn.addEventListener('click',()=>{
//    Head1.innerText=`This page belongs to ${userName}`;
// // console.log("hello");
// })

const fruits = ["apple","orange","banana","kiwi"];

// const FruitHeader = document.getElementById("Fruits-heading");

// fruits.map((item,index)=>{
//    FruitHeader.innerText=item;
// });

// console.log(name11);

var name11;
// let name22 = "sunny";
// const name33 = "money";



// var => redeclare also possible, updation also possible. 
// let => redeclaration not possible, but updation possible.
// const => neither, use when you want the data to remain unchanged

console.log(typeof("vivek"),typeof(1000),typeof(true),typeof(name11),typeof(null),typeof([1,2,3,4,5]),typeof({username:"mahesh",age:18}));

function hello(){
   return "hello";
}

console.log(typeof(hello));

// null type is obejct due to a historical bug since inception of javascript, initially all data types were assigned type tags and values and
// for objects value was 0, null was considered as NULL Pointer so its type tag also became 0, thus it became object .

const SuperHero = {
   usrname:'Thor',
   age:1500,
   city:'asgard'
};

SuperHero.city = 'gotham';

// SuperHero = {
//    usrname:'cap',
//    age: 1000,
//    city:'brooklyn'
// }

console.log(SuperHero);

// Hoisting ka simple meaning hai ki, declaration behind the scenes top pe jaati hai, something like this :- 

console.log(name12); // ❓ What happens here?

var name12 = "Thor";  // Variable declaration

// behind the scenes :- 

var name;  // Declaration hoisted to the top
console.log(name12); // ✅ Prints undefined
name12 = "Thor";  // Assignment stays in place


/* All three (var, let, const) are hoisted, but:
    var is hoisted with an initial value of undefined.
    let and const are hoisted but stay in the Temporal Dead Zone (TDZ) until their assignment line is executed.
    Only declarations are hoisted, not assignments. */



// FUNCTION HOISTING

// Just like variables, functions in JavaScript are hoisted, but they behave differently based on how they are defined.

// 1. named functions

greeter();

 function greeter(){
   console.log("hello boss !!");
 }

 // named functions are hoisted completely with their definition to the top, so it means that named functions can be called before their declaration and initialization.

 // 2. Function Expressions

//  SayHi();

//  const SayHi = function(){
//    console.log("hello i am expression");
//  }

 // throws this error => ReferenceError: Cannot access 'SayHi' before initialization;

 // hoist hua but only declaration, stays in TDZ until assignment.


 // 3. Arrow Functions

//  SayHello();

//  const SayHello = () => {
//    console.log("I am arrow");
//  }

 // Throws same error as the function expression due to the same TDZ reason.

 // LET US UNDERSTAND ABOUT EXECUTION CONTEXT AND CALL STACK, basically how javascript executes its code. 

 // so there are basically 2 phases:-

 // 1st phase: Memory Creation Phase => js scans the entire code and allocates variables and functions in the memory.

 // 2nd phase : Execution Phase => js executes the code line by line

// now during the execution phase, something called Call Stack is used:-

// in the call stack :- Each function gets added to the stack when called
// Once a function finishes, it is removed from the stack
// The main program resumes after the function is done
// JS always runs the function on top of the stack first!

// Closures allow a function to remember variables even after it has finished executing. (IMP)

// example code to understand closures :- 

function createCounter() {
  let count = 0;  // Stored in memory (locker)

  return function() {   // Function (key) that can access count
    count++;
    console.log(count);
  };
}

const counter = createCounter();  // Creates a new counter
counter();  // 1
counter();  // 2
counter();  // 3
counter();

// closure yaani function apne execution ke baad bhi variable ki value ko retain kare, ki last value kya thi

// what will happen without closure ?

function createCounter1() {
  let count = 0; // New `count` is created every time
  
  function increment() {
    count++;
    console.log(count);
  }

  increment();
}

createCounter1(); // 1
createCounter1(); // 1
createCounter1(); // 1

// HOW TO WRITE OR IDENTIFY A CLOSURE FUNCTION 

// A closure is just a function that remembers variables from its outer scope even after the outer function has finished executing.


function outerFunction() {
  let secret = "I am a closure";  // ✅ A variable inside the outer function

  return function innerFunction() {
    console.log(secret); // ✅ Inner function remembers `secret`
  };
}

const closureFunc = outerFunction(); // `outerFunction()` runs and returns `innerFunction`
closureFunc(); // Prints: I am a closure

function CountKeeper(){
  let CountVal = 0;

  return function CountAccesser(){
    CountVal++;
    console.log(CountVal)
  }

}

const CounterFunc = CountKeeper();

CounterFunc();
CounterFunc();
CounterFunc();
CounterFunc();

const store=(function CountKeeper1(){
  let countval1 = 0;
  return function countaccesser1(){
    countval1++;
    console.log(countval1)
  }
})();

store();
store();
store();
store();


// THIS KEYWORD IN DIFFERENT CONTEXTS

let name_my = "vivek"

console.log(this.name_my)

// Above code returns undefined, because we are running code in node js, in node the default global object is not window.
// whereas in browsers, the default global object is window, but this.name will return the value in browser console only and only if
// var is used to declare the name, because var attaches itself to window object whereas let and const doesnt do that.

function ShowThis(){
  let val = 1000;
  console.log(this.val)
}

ShowThis()

const ObjCar = {
  model:"Fronx",
  brand:"maruti",
  Year:2024,
  Horn:function(){
    console.log(`Hello I am ${this.model} from ${this.brand} of year ${this.Year}`);
  }
}

ObjCar.Horn();

// When a function is created as a object method then the this keyword refers to the properties of the object itself.

const ObjCar2 = {
  model:"Fortuner",
  brand:"Toyota",
  Horn: ()=>{
    console.log(`hello I am ${this.model}`)
  }
};

ObjCar2.Horn()

// Gives undefined, because arrow function doesnt bind this.

// So, basically kya ho raha hai, ek object mein  jab regular function use karke object method banate hai then, this of that regular function
// refers to that object only, uski binding uss object se hi hojati hai by default, but that doesnt hold true for arrow functions.
// yaani agar ek arrow function object mein, regular ki jagah use kara jaaye, toh this bind nhi hoga object se by default, rather woh apne surrounding scope ka this
// inherit karte, jo iss case mein global scope hojata hai. 

// But agar yahi hum nesting karde, toh pata chal jayega upar kya kehne ki try kar rahe hai. lets see with an example:-

const ObjCar3 = {
  model:"Sonet",
  brand:"kia",
  Horn:function(){
    const innerfunc=()=>{
      console.log(`hello i am ${this.model} of brand ${this.brand}`)
    }
   innerfunc();
  }
}

ObjCar3.Horn();

// Looking at the above example it becomes pretty clear that arrow function takes this from its surrounding scope, here it is regular function Horn.

// Now instead of this arrow function if you use a regular function inside another regular function. The following will happen:-

const ObjCar4 = {
  model:"Sonet",
  brand:"kia",
  Horn:function(){
    function innerfunc(){
      console.log(`hello i am ${this.model} of brand ${this.brand}`)
    }
   innerfunc();
  }
}

ObjCar4.Horn();

// Output :- hello i am undefined of brand undefined

// why does this happen ?

// innerFunction() is also a regular function, but regular functions create their own this.
// Since innerFunction() is not called on person, it defaults to the global scope (window in browsers, undefined in strict mode).

/*
Regular function inside object	                    this refers to the object ✅
Arrow function inside object	                      this refers to global (window) ❌
Regular function inside a regular function	        this refers to global (window) ❌
Arrow function inside a regular function	          this inherits this from the regular function ✅
*/

 // Lets learn about call,bind and apply now.

 // These three methods allow us to manually set this inside a function.
//  They are useful when this isn’t behaving the way we want.

const CarObj = {
  model:"nexon",
  brand:"tata",
  horn:function(){
    function SayHello(){
    console.log(`hello i am ${this.model}`)
    }
    SayHello();
  }
}

CarObj.horn()

// call,apply and bind all three are used for the same purpose but have certain difference between them.

// for example:- bind is used to permanently bind this to a particular scope whereas call and apply are temporary

