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

// async code will include either of these :- setTimeout, setInterval, Promise, fetch, then

