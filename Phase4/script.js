// ASYNCHRONOUS JAVASCRIPT

// sync and async kya hota hai ?

// sync means when tasks are completed one by one in an order, and next task starts only jab usse pehle wala completed hojaye.

// yaani agar mujhe 3 tasks karne hai synchronously, toh pehle task1 hoga, fir task2 and then task3. agar inme se koi sa bhi task
// ruk jaata hai for some reason, toh usse aage wala task execute nahi hoga.

// async mein tasks ek saath execute hote hai, and jaise jaise unke results aate hai woh process hojate hai, but kisi task ke chakkar mein
// koi dusra task block nahi hota hai

// yaani we can also say that, async js is of NON-BLOCKING nature whereas sync js code is of  BLOCKING NATURE.


// example of simple sync code

console.log("task1")
console.log("task2")
console.log("task3")
console.log("task4")

// async code will include either of these :- setTimeout, setInterval, Promise, fetch, then.

// example of async code 

console.log("task1");

// setTimeout(function(){
//     console.log("task2")
// },4000);

console.log("task3");

// setInterval(function(){
//     console.log("Testing.....")
// },2000)

// CALLBACKS

setTimeout(function(){
    console.log("I am an example of Callback function")
},4000)

// Toh callback kya hota hai se zyda confuse na hoke simple rakhte hai :- upar setTimeout mein jo function as an argument pass
// kara hai, wohi ek callback function hai.

// callback ke naam se hi pata chal rha hai ek aisa function jisse after certain time or happening of a certain task call back kar rahe hai

// In the above example, callback 4 seconds baad call ho rha hai, but it is not necessary ki har callback ki calling time dependent ho.

// yaani async code mein callback humesha koi result aane pe chalta hai.

// IMP POINT :- JS IS NOT ASYNCHRONOUS 

// Now listen to important story :-

// javascript ka code 2 parts mein divide ho sakta hai :- sync code and async code 

// now behind the scenes kya kar rahi hai javascript, there are 2 stacks :- Main stack and Side Stack,

// toh it is important to understand that jo bhi js ka sync code hoga it will always go into main stack, always. 

// and then jo jo main stack mein hoga, woh ek ek karke execute hota rahega and usse stack se bahar karte rahenge. 

// and only and only when yeh main stack empty hojayega js will go to side stack and check if there is something in side stack.

// and side stack mein kya hoga, async code, saara async code side stack mein hoga, from there when its processing will complete  

// usse main stack mein daala jayega. 

// And this whole process of main stack and side stack conversing with each other where main stack constantly keeps checking for aysnc code

// in side stack , is known as EVENT LOOP. Very very important concept.


// Hence, js is not async...why??... Because js is single threaded. Single Thread ka matlab sirf ek hi computation karne ki power hai ek time pe.

// A thread is like a worker that executes code.
// Think of a thread as a single path of execution inside a program.

// In simple terms, when you run a program, a thread is responsible for executing the instructions, one by one, from top to bottom.


// JS is SINGLE-THREADED, meaning:

//     One main thread (Call Stack) executes code sequentially.

//     If one task takes too long, everything else gets blocked! 

//     But JS avoids blocking by using ASYNC operations (Web APIs, Event Loop, Callbacks, Promises, etc.) 

// Yaani aise bhi samajh sakte ho that js single threaded yaani ek call stack mein saare tasks ek ek karke hote hai, isliye hi async code ki need hai
// kyuki async code ki madad se we can ensure koi piece of code, baaki code ka execution block na kare.

console.log("Task-1")
console.log("Task-2")
setTimeout(function(){
    console.log("Task-3")
},0)
console.log("Task-4")

// Uparwale example mein task1,task2,task4 are sync code toh woh direct main call stack mein jaate hai execute hone
// toh pehle yeh saare execute honge fir jab stack empty hojayega, toh side stack mein dekha jayega koi async operation hai ya nahi
// agar hai toh fir woh main stack mein daalke execute hojata hai, jaise in this case task4.

// Now, callback humesha ek function hota hai, ek aisa function jo async code ke complete hone pe chalta hai.

function delayedMessage(message,delay,callback){
    setTimeout(function(){
        console.log(message)
        callback();
    },delay)
}

function delayCallback(){
    console.log("delayed message executed boss !")
}

delayedMessage("Hello My Name is Vivek Singh",2000,delayCallback)

var answer = new Promise((res,rej)=>{
    var n = Math.floor(Math.random())*100;
    if(n<5){
        return res();
    }
    else{
        return rej();
    }
})

answer.then(
    function(){
        console.log("number is lesser than 5")
    }
)
.catch(function(){
    console.log("number is greater than 5")
})