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

// let chaiBanaPromise = new Promise((resolve, reject) => {
//   console.log("Gas on, paani garam ho raha hai...");

//   setTimeout(() => {
//       let gasAvailable = true; // Try false to test reject case

//       if (gasAvailable) {
//           resolve("Chai ready! ☕");
//       } else {
//           reject("Gas khatam ho gayi! ❌");
//       }
//   }, 3000);
// });


// Yeh upar ab humne ek promise create kardiya, yaani yeh ek async piece of code hai jo 3 sec wait karega aur yeh uske baad ya toh
// resolve hojayega ya reject. ab iss promise ko hum consume karenge :-

// chaiBanaPromise.then((successMessage)=>{
//   console.log("Success:-",successMessage)
// }).catch((errorMessage)=>{
//  console.log("Error:-",errorMessage)
// });

// aise samajh ki in future aapke paas kuch data aayega, ya kuch bhi hoyega and for handling that you are using an object called promise.

// challenge:-

// let PizzaHandlePromise = new Promise((resolve,reject)=>{
//    setTimeout(()=>{
//     let RestaurantOpen = true;
//     if(RestaurantOpen == true){
//       resolve("Pizza is cooked !")
//     }
//     else{
//       reject("Restaurant not open !")
//     }
//    },3000)
// });


// PizzaHandlePromise.then((message)=>{
//   console.log(message)
// }).catch((message)=>{
//   console.log(message)
// });


// let TicketBooking = new Promise((resolve,reject)=>{
//   console.log("Begin the process of ticket booking !!")
//   setTimeout(()=>{
//     let confirmed = Math.random() > 0.5;
//     if(confirmed){
//       resolve("ticket booked");
//     }
//     else{
//       reject("ticket rejected");
//     }
//   },2000)
// })

// TicketBooking.then((message)=>{
//  console.log(message);
//  return new Promise((resolve,reject)=>{
//    setTimeout(()=>{
//     let TrainArrived = Math.random() > 0.5;
//     if(TrainArrived){
//       resolve("Train has arrived")
//     }
//     else{
//       reject("Train couldn't arrive on time !")
//     }
//    },3000)
//  })
// }).then((message)=>{
//   console.log(message)
//   return new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//       let TrainBoarded = Math.random > 0.5
//       if(TrainBoarded){
//        resolve("I have boarded the train !")
//       }
//       else{
//         reject("I couldn't board the train !")
//       }
//    },3000)
//   })
// }).catch((error)=>{
//   console.log(error)
// });


// Now, the promise that we have consumed above, we have use chaining, but in the chain of promises, we have used promises
// without storing in a variable and directly returning them.

// let us see the example of online shopping system with stored promises now !

// Ek "Online Shopping System" banao jo:
// Order place kare (2s, 50% fail chance)
// Payment process kare (3s, 50% fail chance)
// Product pack kare (2s, 50% fail chance)
// Product ship kare (3s, 50% fail chance)
// Agar kahin bhi fail ho gaya, error print ho.

// function OnlineShoppingSystem(){
//   return new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//       let orderPlace = Math.random() > 0.5;
//       if(orderPlace){
//         resolve("Order Place Successfully !!!")
//       }
//       else{
//         reject("Order Couldn't be placed")
//       }
//     },2000)
//   })
// } 

// function PaymentProcessing(){
//    return new Promise((resolve,reject)=>{
//   setTimeout(()=>{
//     let PaymentProcess = Math.random() > 0.5;
//       if(PaymentProcess){
//         resolve("Payment has been processed !!!")
//       }
//       else{
//         reject("Payment Failed !!!")
//       }
//   },3000)
//    })
// }

// function ProductPacking(){
//   return new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//       let ProductPacked = Math.random() > 0.5;
//       if(ProductPacked){
//         resolve("product has been packed successfully")
//       }
//       else{
//         reject("Product couldn't be packed")
//       }
//     },3000)
//   })
// }

// function ProductShipping(){
//   return new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//       let productShipped = Math.random() > 0.5;
//       if(productShipped){
//         resolve("Product Shipped Successfully !")
//       }
//       else{
//         reject("Product shipping failed !")
//       }
//     },3000)
//   })
// }

// OnlineShoppingSystem.then((message)=>{
//   console.log(message)
//   return PaymentProcessing();
// }).then((message)=>{
//   console.log(message);
//   return ProductPacking();
// }).then((message)=>{
//   console.log(message)
//   return ProductShipping();
// }).catch((error)=>{
//   console.log(error)
// })

// ASYNC AWAIT 

// Yeh Promises ka hi upgrade hai, lekin aur readable, aur natural lagta hai jaise hum normally likhte hain.

// async function DoShopping(){
//    try{
//     let OnlineShopping = await OnlineShoppingSystem();
//     console.log(OnlineShopping)
  
//     let Payment = await PaymentProcessing();
//     console.log(Payment);
  
//     let Product = await ProductPacking();
//     console.log(Product)
  
//     let Shipping = await ProductShipping();
//     console.log(Shipping)
//   }
//   catch(error){
//     console.log(error)
//   }
// }

// DoShopping()

// Challenge: Movie Night System using async/await
// Steps:
// Buy movie ticket (50% chance fail)
// Enter theatre
// Watch movie
// Review movie

// lets trying solving in both ways using promises then and then using async await.

//  1st. Using then()

let MovieNightSystem = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    let MovieTicket = Math.random() > 0.5;
    if(MovieTicket){
      resolve("movie ticket bought successfully !!!")
    }
    else{
      reject("movie ticket buying failed !!!")
    }
  },2000)
})

function EnterTheatre(){
  return new Promise((resolve)=>{
    setTimeout(()=>{
       resolve("Entered In Theatre")
    },2000)
  })
}

function WatchMovie(){
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve("Watching movie now !")
    },2000)
  })
}

function ReviewMovie(){
  return new Promise((resolve)=>{
    resolve("reviewed the movie!!")
  })
}

MovieNightSystem.then((message)=>{
  console.log(message);
  return EnterTheatre();
}).then((message)=>{
  console.log(message)
  return WatchMovie();
}).then((message)=>{
  console.log(message)
  return ReviewMovie();
}).catch((error)=>{
  console.log(error)
});

function MovieNightSystem2(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      let movieTicket = Math.random() < 0.5;
    if(movieTicket){
      resolve("Movie Ticket Booked Successfully !!")
    }
    else{
      reject("Movie Ticked Failed !!!")
    }
    },2000)
  })
}

function EnterTheatre2(){
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve("Entered Theatre Successfully!!")
    },2000)
  })
}

function WatchMovie2(){
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve("watched movie !!!")
    },2000)
  })
}

function ReviewMovie2(){
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve("Reviewd Movie!!!")
    },2000)
  })
}

async function WatchingMovie(){

  try{
    let MovieNight = await MovieNightSystem2();
    console.log(MovieNight)
  
    let Theatre = await EnterTheatre2();
    console.log(Theatre)
  
    let WatchM = await WatchMovie2();
    console.log(WatchM)
  
    let ReviewM = await ReviewMovie2();
    console.log(ReviewM)
  }
  catch(error){
    console.log(error)
  }
}

WatchingMovie();

// Now let us learn about Promise.all() 

// You have three async tasks:

//  Order Pizza (2 sec)

//  Get Cold Drink (1.5 sec)

//  Make Popcorn (1 sec)

// Now, normally in async/await, you’d do: 

function OrderPizza(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      let Order = Math.random() < 0.5;
      if(Order){
        resolve("Pizza Order Success !!!")
      }
      else{
        reject("Pizza Order Failed !!!")
      }
    },2000)
  })
}

function GetColdDrink(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      let BuyColdDrink = Math.random() < 0.5;
      if(BuyColdDrink){
          resolve("Bought Cold Drink !")
      }
      else{
        reject("Couldn't buy cold drink !")
      }
    },1500)
  })
}

function MakePopcorn(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      let PopCorn = Math.random() < 0.5;
      if(PopCorn){
        resolve("Popcorn Made !")
      }
      else{
        reject("Popcorn failed !")
      }
    },1000)
  })
}

// async function Party(){
  
//   try{
//   let Pizza = await OrderPizza();
//   console.log(Pizza)

//   let Cold = await GetColdDrink();
//   console.log(Cold)

//   let Popcorn = MakePopcorn();
//   console.log(Popcorn)
//   }
//   catch(error){
//     console.log(error)
//   }

// }

// Party()

// now lets implement the above using Promise.all()

async function Party(){
  try{
   const results = await Promise.all([
     OrderPizza() , GetColdDrink() , MakePopcorn()
   ])
   console.log(results)
  }
 catch(error){
   console.log(error)
 }
}

Party()

// ab promise.all ko samjho ki yeh kya kar raha, kyuki jab hum individual promise wala await lga skte hai, why use promise.all
// simple explanation hai:- jab hum async await use karte hai, ek ek karke tasks execute karte hai , toh async hote hue bhi behaviour
// sync code wala hota hai, yaani sequence mein execution hona , for example:- agar 3 tasks hai :- and they take following time:-
// 2s , 3s , 2s => toh yaha total time => 7s lagega, lekin if we use promiseall() , toh saare parallel execute hona shuru kardenge,
// toh yaha 3s mein teeno hojayenge.

// The JavaScript thread doesn’t block, that’s the async benefit 
// But your code still runs step-by-step, so overall time = sum of all durations 
// Even though async/await is non-blocking, sequential awaits still happen one-after-another unless 
// you intentionally make them run in parallel — and that’s why Promise.all() is a performance booster 

async function Party(){
   try{
    const results = await Promise.allSettled([
      OrderPizza() , GetColdDrink() , MakePopcorn()
    ])
    console.log(results)
   }
  catch(error){
    console.log(error)
  }
}

Party()

// What is Promise.allSettled()?
// It runs all the promises in parallel (like Promise.all),
// but it never fails — it gives you a report of all the results,
// whether they succeeded  or failed.

// Use when you care about all results, not just the successful ones
// Promise.all() would stop at the first failure, throwing away others

// TOh basically all wala kaam hi karega allSettled() , lekin it will return an array with outcome of all the tasks whether
// they are resolved or rejected, unlike all jo sirf resolved ya reject ke messages dega

// Promise.race()

// It runs all promises in parallel, but returns the result of whichever finishes first, whether it’s success or failure.

// in simple words, jisne pehle finishing line touch kari woh winner, uska result aayega doesnt matter if its a resolve or a reject.

// and yes, it directly depends on the timing given in setTimeout, yaani 1000ms wala 2000ms wale se pehle hoga and uska hi result 
// display hoga, despite of it being a reject.

// Promise.any()

// Promise.any() exactly wohi karega jo promise.race() karta hai, parallel run karta hai, but yeh fastest response nhi deta, yeh 
// first successful response deta hai yeh, reject ko ignore kardeta.

// let us see an example :- 

function Friend1(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      let chance = Math.random() > 0.5;
      if(chance){
        resolve("Friend 1 is ready for meetup !")
      }
      else{
        reject("Friend 1 is not available !")
      }
    },2000)
  })
}

function Friend2(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      let chance = Math.random() > 0.5;
      if(chance){
        resolve("Friend 2 is ready for meetup !")
      }
      else{
        reject("Friend 2 is not available !")
      }
    },2000)
  })
}

function Friend3(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      let chance = Math.random() > 0.5;
      if(chance){
        resolve("Friend 3 is ready for meetup !")
      }
      else{
        reject("Friend 3 is not available !")
      }
    },2000)
  })
}
  
  async function Meeting(){
    try{
      const result = await Promise.any([
        Friend1(),Friend2(),Friend3()
      ])

      console.log(result)
    }
    catch(error){
      console.log(error)
    }
  }

  Meeting()
  