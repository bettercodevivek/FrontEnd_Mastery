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