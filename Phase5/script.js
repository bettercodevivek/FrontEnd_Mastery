// Now we will learn fetch api in javascript

// The fetch() function is used in JavaScript to make HTTP requests to servers (like APIs).
// It returns a Promise, so we use .then() or async/await to handle it.

// example :-

async function GetMenu(){
    try{
        const result = await fetch("https://jsonplaceholder.typicode.com/posts")

        if(!result.ok){
            throw new Error("Menu Load Failed !!")
        }

        const menu =  await result.json();
        console.log("Menu is :- ", menu)

    }
    catch(error){
       console.log(error);
    }
}

GetMenu()

// challenge 1

async function GetJoke(){
    try{
        const response = await fetch("https://official-joke-api.appspot.com/random_joke")

        if(!response.ok){
            throw new Error("couldn't joke boss !!")
        }
    
        const joke = await response.json();
        console.log(joke)
        console.log(`setup :- ${joke.setup}`)
        console.log(`punchline :- ${joke.punchline}`)
    }
     catch(error){
        console.log(error)
     }
}

GetJoke()

// So far we were only getting data from an API (using GET). But what if we want to send some data — like submitting a form, creating a new user, or posting a comment?

// We use a POST request 

// BASIC SYNTAX FOR A POST REQUEST :- 

// fetch("https://example.com/api", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({ name: "Bro", age: 21 })
//   });


async function SubmitData(){
    try{
        const response = await fetch("https://jsonplaceholder.typicode.com/comments",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(
                    {
                        name:"josh",
                        age:20,
                        id:112,
                    }
                )
            }
        )

        const result = await response.json()
        console.log("Result Posted:",result)
    }
    catch(error){
        console.log(error)
    }
}
  

SubmitData();

// Explanation of above code :- 

// method	               Tells the API we are sending data (POST)
// headers	               Says what kind of data we're sending
// body	                   The actual data, converted to JSON string
// response.json()	       Converts the response into JS object

// challenge 2

// sending a POST request to an endpoint

async function SubmitData2(){
    try{
        const response = await fetch("https://jsonplaceholder.typicode.com/posts",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                title: "Learning Fetch is lit 🔥",
                body: "With my G's help, I'm mastering JavaScript!",
                userId: 99
            })
        })
    
        const result = await response.json()
        console.log("Data Sent Success:-",result)
    }
    catch(error){
        console.log(error)
    }
}

SubmitData2();

// Let us now Study about Events in JS, basically all those events that can happen on a page in browser.

// 1. click event

// element_name.addEventListener('click',callback)

const SubBtn = document.getElementById('subBtn');
const statusHeading = document.getElementById('status');

SubBtn.addEventListener('click',(e)=>{
    console.log(e.target)
    statusHeading.textContent = "Subscribed ✅";
    e.target.textContent = "JAI SHREE RAM"
})

// document.addEventListener('click',(e)=>{
//     console.log(e.clientX)
// })

// Ab ek cheez samajhte hai :- Whenever an event is triggered, 
// JavaScript passes an object to your callback. This object contains tons of useful information.

// yeh event object hota hai, jiski bhaut saari useful properties hoti hai :- 

// Property	                                What it tells you

// event.type	                            Type of event (e.g. "click", "keydown")
// event.target	                            The actual element that triggered the event
// event.clientX	                        X position of the mouse on screen
// event.clientY	                        Y position of the mouse on screen
// event.key	                            Key pressed (useful in keyboard events)
// event.preventDefault()	                Stops default behavior (like form submission)

// challenge 

let score = document.getElementById('score')
let currentScore=0;

const buttons = document.querySelectorAll('.scoreBtn')

buttons.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        let value = parseInt(e.target.textContent);
        currentScore+=value;
        score.textContent = currentScore;
    })
})

// document.addEventListener('keydown', (event) => {
//     console.log("Key Pressed:", event.code);
//   });
  

// Now lets us learn about key events :- 

// There are mainly 2 key events => keydown and keyup.

// and there are 2 event properties for keys:- event.key gives us key pressed and event.code gives physical location of key.

let KeyStatus = document.getElementById('keyStatus')

let CurrScore = document.getElementById('Keyscore')

let Value = 0;

document.addEventListener('keydown',(e)=>{
    if(e.code === 'Enter'){
        KeyStatus.textContent = "Ready To Play !"
    }
    else if(e.code === 'Escape'){
        KeyStatus.textContent = "Game Paused !"
    }
    else if(e.key === 'r'){
        KeyStatus.textContent = "Game Reset !"
        Value = 0;
        CurrScore.textContent = Value;
    }
    else{
        Value+=1;
        CurrScore.textContent=Value;
    }
})


// Now let us learn about some form events 

// 1. submit event

// triggered when form is submitted 

 const form = document.getElementById('form1');


 form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let name_value=document.getElementById('username').value;
    console.log("Form Submitted By :- ",name_value)
 })

 // toh basically submit event ki help se hum form submission ke time pe kuch bhi karva sakte hai. For example :- one of the
 // most imp use cases is :- event.preventDefault() , this basically prevents the default behaviour of form which is whenever
 // a form is submitted, it reloads the entire page.

 // 2. input event

 // Jab user type karta hai input field me, ye har ek character par trigger hota hai.

 form.addEventListener('input',(e)=>{
    let value1 = document.getElementById('input1').value;
    console.log(value1)
 })

 // in console, every character gets printed as it is typed in input , this can be used for live character count and search suggestions.


 // 3. reset event

 // triggered when form is reset using a reset type button

 form.addEventListener('reset',()=>{
    console.log("form Reset !")
 })
 

 // So, these are some major form events that important , rest you can learn during project building !