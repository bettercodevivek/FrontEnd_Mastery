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

emitter1.on("Hello",()=>{
   console.log("Event has been emitted and listened Boss !!")
})


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

//  class Cars{
//     constructor(carname){
//         this.carname=carname;
//     }
//  }

//  const car1 = Cars("toyota")

//  console.log(car1.carname) // Class constructor Cars cannot be invoked without 'new'

 // so it is very important to understand when you are dealing with constructor functions, objects and classes, new keyword is a must
 // especially with classes, we can clearly see that without new we get the above error.

 emitter1.emit("Hello")

 // So , lets learn everything that we can about this events module

 // 1. Basic Setup 

//  const EventEmitter = require('events');
//  const event = new EventEmitter();

// 2. Registering an event listener

//  event.on("eventname",()=>{
//     console.log('event triggered !')
//  })

// on() is our standard listener and can run multiple times

// 3. Triggering the event

// event.emit("eventname")

// Triggers all listeners attached to eventName

// Sync execution, in order of registration

// 4. Passing data to listeners

// event.on('data',(msg,code)=>{
//   console.log(`Message:${msg} and Code:${code}`)
// });

// event.emit('data','hello',200)

// 5. one time listener ( this is perfect when you want something to happen only once like app started or db connected)

// event.once('launch',()=>{
//  console.log("this will run only once !")})

// 6. removing listeners

// event.off() or event.removeListener() can be used when we no longer wish to listen to an event.

// 7. getting listeners info

// console.log(event.eventNames()); List of all event names
// console.log(event.listenerCount('eventName')); How many listeners on an event

// 8. Listener leak warning

// toh basically hota kya hai, agar hum kisi event emission pe, 10 se zyda listeners (on()) lagade, toh node js will give us a warning
// it may look like this :- (node:12873) MaxListenersExceededWarning: Possible EventEmitter memory leak detected.

// To fix this :-

// event.setMaxListeners(20); // you can set the max limit for listeners as per you convinience

// So, LETS DO A CHALLENGE TO CEMENT THIS CONCEPT OF EVENT MODULES :-

// Simulate a file downloading system using EventEmitter where different parts of the system react to events like 
// start, progress, error, and complete.

const eventEmitter1 = require('events');

class DownloadManager extends eventEmitter1{
      startDownload(){
         event
      }
}




