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