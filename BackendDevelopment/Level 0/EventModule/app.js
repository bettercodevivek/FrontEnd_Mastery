// Toh theek hai yaar, after fs module lets us understand what Event Module is and why do we even need it.

// let us understand it with an example :- 

// Imagine tu ek party host kar raha hai. Party mein DJ hai, doston ka group hai, aur ek rule hai:

//   "Jab DJ music bajaye, sab dance karenge."

// Yeh exactly wahi concept hai jo Node.js follow karta hai —
// Kuch hone pe (music bajna) → uske response mein kuch execute karna (dance karna)

// Basically, koi event trigger (emit) hoga, and uske emission pe kuch action karna hai. This is what Event Emitter helps us to do.

// Ab yeh jo Event Emitter hai woh 3 tasks karta hai :-
 
// 1. Event listen karta hai

// 2. Event Emit Karta hai

// 3. Listener ko action batata hai 

// And isme chronology yeh hogi, Event will be emitted -> Event will be listened -> Action performed after listening to event


// Example code:-

const EventEmitter = require('events')

const emitter1 = new EventEmitter();

// SIDE NOTE:- so suddenly mjhe new keyword ki significance ke baare mein jaane ka importance laga so here it is :- 

// new ka use sirf tab hota hai jab tu kisi constructor function ya class se object create kar raha ho. 
// Otherwise, bina new ke bhi kaam chalta hai agar tu simple functions ya normal object literals use kar raha hai.

// new keyword ke 4 main kaam hote hai :- 

// Ek naya empty object {} banata hai
// this ko us naye object pe point kara deta hai
// Constructor function ke andar ka code run karta hai
// Woh naya object return hota hai (agar return manually kuch aur na kara ho)

// example code:- 

// 1. with new

 function User(username){
    this.username=username;
 }

 const user1 = new User("john doe")

 console.log(user1.username)

 class Fruits{
    constructor(fruitname){
        this.fruitname=fruitname;
    }
 }

 const fruit1 = new Fruits("Orange")

 console.log(fruit1.fruitname)

 // 2. without new

 function hello(name){
    console.log(`hello how are you ${name}`)
 }

 hello("Travis")

 class Cars{
    constructor(carname){
        this.carname=carname;
    }
 }

 const car1 = Cars("toyota")

 console.log(car1.carname) // Class constructor Cars cannot be invoked without 'new'

 // so it is very important to understand when you are dealing with constructor functions, objects and classes, new keyword is a must
 // especially with classes, we can clearly see that without new we get the above error.