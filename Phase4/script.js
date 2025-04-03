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

// setTimeout(function(){
//     console.log("I am an example of Callback function")
// },4000)

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

// Basically, aisa samjho ki hamara ek function hai jo koi data fetch karke laa rha hai, and we want ki jab woh data aajaye
// uspe kch operation hoye, but as js is synchronous in nature, how would you ensure ki sirf tab hi operation hoye jab data aajaye
// usse pehle execute hoke error na de, here is where you use callback.

function downloadData(fileName, afterDownload) {
    console.log("Downloading " + fileName + "...");
    
    setTimeout(function() {
      let data = "This is the content of " + fileName;
      afterDownload(data); // Pass data to the callback
    }, 2000);
  }
  
  function useTheData(myData) {
    console.log("Now I can use the data: " + myData);
  }
  
  downloadData("important_file.txt", useTheData);

  // Yaha agar upar hum useTheData ko as a callback na pass karke, normal ek sync code ki tarah likhdete, toh data aane se pehle hi execute hojata
  // aur error dedeta. TOH AASAN SHABDO MEIN CALLBACK HUM APNE CODE KO ASYNC BANANE KE LIYE USE KARTE HAI, YAANI JAB AAP CHAHO
  // KI MERA KOI PARTICULAR FUNCTION TAB EXECUTE HOYE JAB USSE KOI CUE MILE, LIKE KOI EVENT HOYE. ISLIYE CALLBACKS KA SABSE
  // COMMON AND IMPORTANT REAL LIFE USE CASE HAI EVENT-LISTENERS, JO EK CALLBACK LETE HAI, WHICH MEANS, EVENT TRIGGER HOTE HI 
  // CALLBACK EXECUTE HOJAYEGA.

  // let us do a challenge to understand it better.

// Can you write a function called calculateDouble that:
// Takes a number and a callback function
// Doubles the number
// Passes the result to the callback


function calculateDouble(num,callback){
    num=num*2;
    callback(num);
}

function callback(result){
    console.log("The Result is :- ",result);
}

calculateDouble(10,callback);

// ab yaha upar, humne pehle num pass kara as argument, uspe operate kara and after that callback mein usse pass kara. ab agar yaha
// callback hum bahar hi likhdete as a sync code toh num pe operation hone se pehle hi result aajata jo undefined hota.

// checkIfUserExists('john@example.com', function(exists) {
//   if (!exists) {
//     createUser('john@example.com', 'John', function(user) {
//       console.log("User created:", user);
      
//       sendWelcomeEmail(user.email, function(success) {
//         if (success) {
//           addToNewsletter(user.email, function(subscribed) {
//             if (subscribed) {
//               createFirstProject(user.id, function(project) {
//                 console.log("First project created for", user.name);
                
//                 redirectToWelcomePage(user, project, function() {
//                   console.log("Registration process completed!");
//                 });
//               });
//             }
//           });
//         }
//       });
//     });
//   } else {
//     console.log("User already exists!");
//   }
// });

// DEKH CONFUSE MAT HO, SIMPLE SAMAJH => JAVASCRIPT BY DEFAULT SYNCHRONOUS HAI, AB USME ASYNC BANANE KE LIYE CALLBACK KA MAINLY
// USE HOTA THA STARTING MEIN KI, THERE IS THIS PARTICULAR FUNCTION JO MAIN CHAHTA HU KI TAB EXECUTE HOYE JAB ISSE EK TRIGGER YA CUE MILE
// TOH YAHA CALLBACK KAAM AATA HAI, AB HUA KYA KI, COMPLEX REQUIREMENTS MEIN CALLBACK KI NESTING HUI, WHICH LEAD TO SOMETHING CALLED
// CALLBACK HELL. TOH USS SE BACHNE KE LIYE AAYA PROMISES KA CONCEPT IN JS.

// TOH YAANI PROMISES DOES WHAT CALLBACK DOES BUT IN A MORE EFFICIENT WAY.

// AB PROMISE BASICALLY EXAMPLE SE SAMAJH:- 

let chaiBanaPromise = new Promise((resolve, reject) => {
  console.log("Gas on, paani garam ho raha hai...");

  setTimeout(() => {
      let gasAvailable = true; // Try false to test reject case

      if (gasAvailable) {
          resolve("Chai ready! ☕");
      } else {
          reject("Gas khatam ho gayi! ❌");
      }
  }, 3000);
});


// Yeh upar ab humne ek promise create kardiya, yaani yeh ek async piece of code hai jo 3 sec wait karega aur yeh uske baad ya toh
// resolve hojayega ya reject. ab iss promise ko hum consume karenge :-

chaiBanaPromise.then((successMessage)=>{
  console.log("Success:-",successMessage)
}).catch((errorMessage)=>{
 console.log("Error:-",errorMessage)
});

// aise samajh ki in future aapke paas kuch data aayega, ya kuch bhi hoyega and for handling that you are using an object called promise.

// challenge:-

let PizzaHandlePromise = new Promise((resolve,reject)=>{
   setTimeout(()=>{
    let RestaurantOpen = true;
    if(RestaurantOpen == true){
      resolve("Pizza is cooked !")
    }
    else{
      reject("Restaurant not open !")
    }
   },3000)
});


PizzaHandlePromise.then((message)=>{
  console.log(message)
}).catch((message)=>{
  console.log(message)
});


let TicketBooking = new Promise((resolve,reject)=>{
  console.log("Begin the process of ticket booking !!")
  setTimeout(()=>{
    let book = Math.random() > 0.5;
    if(book == true){
      resolve("ticket booked");
    }
    else{
      reject("ticket rejected");
    }
  },2000)
})

TicketBooking.then((BookMessage)=>{
console.log(BookMessage);
return new Promise((resolve,reject)=>{
  setTimeout(()=>{
   
  },2000)
})
})