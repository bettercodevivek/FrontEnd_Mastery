// In this Phase we will learn about Arrays and Strings

// Arrays are ordered collections of data. You can store numbers, strings, objects, even functions!

const Arr1 = ["IronMan","Thor","Batman"];
console.log(Arr1[2]);
console.log(Arr1.length);

// Array Methods :- 

// 1. map()

// map() creates a new array by applying a function to each element.

// Original array remains unchanged! (IMMUTABLE operation).

// Basic Syntax

// const newArray = array.map((element, index, arr) => {
//     return transformedElement;
//  });
 
// Here element = current element , index = index of current element , arr = the complete array

const numbers = [1,2,3,4,5,6];

const double = numbers.map(value=>value*2);

console.log(double);

// Toh upar basically woh example hai map lagane ka, jab aap sirf values pe koi operation karna chahte ho, koi modification chahte ho, aur modified values wala new array
// aapko mil jaaye.

const numbers1 = [2,4,6,8,10];

const Updated = numbers1.map((value,index)=>{
   value=value*4;
   console.log(`Index: ${index} and value => ${value}`)
   return value;
});

console.log(Updated);

// Toh Bhaiya syntax matters a lot in this case, abhi upar pehle index likhdiya tha fir value, name se fark nhi padta but general syntax ke hisaab se order follow
// karna padega because waise hi JS process karegi map() mein.

// (element,index,arr) : This order should be followed. Kyuki element pe lagaoge aur element 1st ki jagah kahi aur likhdiya toh gadbad aayegi output mein, see an example below:-

const numbers2 = [1,2,3,4,5]

const Updated2 = numbers2.map((index,value)=>{
    value=value*4;
    console.log(`Index: ${index} has value ${value}`);
    return value;
});

console.log(Updated2);

// Iske output mein jo values elements ki dikhni chaiye, woh index pe dikh rahi aur operation bhi index values pe lag raha hai, so order of arguments in callback 
// is important

// 3. map() on string arrays

const names = ["Harvey","Mike","Donna","Louis"];

const UpperCaseNames = names.map(name=>name.toUpperCase());

console.log(UpperCaseNames);

// 4. map() on objects

// if we have an array of users and we want only their names.

 const users = [
    {name:"John",age:35},
    {name:"john2",age:40},
    {name:"john3",age:45},
 ]

 const UserNames = users.map(user=>user.name);

 console.log(UserNames)

//  const UpdatedVals = numbers.map((value,index)=>{
//     console.log(`original:${value},doubled:${value*2},index:${index}`)
//  })

//  console.log(UpdatedVals)

// The above code is wrong, as values are not being returned as object and secondly, no return value gives an undefined array in output

const UpdatedVals=numbers.map((value,index)=>{
  return {
    original:value,
    doubled:value*2,
    index:index,
  }
});

console.log(UpdatedVals);

// Challenge

// Convert the array of words into an array of objects where each object contains:

// word: the original word
// length: the length of the word
// indexPosition: the index

const words = ["hello", "world", "javascript", "rocks"];

const WordsConverted = words.map((word,index)=>{
    return{
        word:word,
        length:word.length,
        indexPosition:index,
    }
})

console.log(WordsConverted)


const UpdatedVals2 = numbers2.map((number,index)=>{
    return{
        original:number,
        squared:number**2,
        cube:number**3,
        indexPosition:index,
    }
})

console.log(UpdatedVals2)

const people = ["Tony Stark", "Steve Rogers", "Bruce Wayne", "Clark Kent"];

const peopleUpdated = people.map((people,index)=>{
    const name= people.split(" ");
    return{
        fullname:people,
        firstname:name[0],
        lastname:name[1],
        length:people.length,
    }
})

console.log(peopleUpdated)

// FINAL CHALLENGE FOR MAP()

const movies = [
    { title: "Inception", rating: 8.8, year: 2010 },
    { title: "The Room", rating: 3.7, year: 2003 },
    { title: "Interstellar", rating: 8.6, year: 2014 },
    { title: "Twilight", rating: 5.2, year: 2008 },
    { title: "The Dark Knight", rating: 9.0, year: 2008 }
  ];
  
const UpdatedMovies = movies.map((value)=>{
    let status;
    if(value.rating >= 8){
        status=`🔥 Must Watch!`;
    }
    else if(value.rating > 5 && value.rating <= 7){
        status=`👍 Good Movie`;
    }
    else{
        status=`👎 Skip it`;
    }
    return{
        displayTitle:`🎬 ${value.title} (${value.year})`,
        status,
    }
});

console.log(UpdatedMovies)

// 2. filer()

// filter() is like the bouncer at the club—it only lets in the elements that pass a specific condition and kicks out the rest! 

// Basic Syntax

// const newArray = originalArray.filter((item) => {
//     return condition; // Only items that return true will stay
// });

// Examples:-

const Numbers_num = [2,4,5,7,8,10];

const FilteredNums = Numbers_num.filter((num)=>num % 2 == 0);

console.log(FilteredNums)

// In the above example, we use filter to store only those numbers, which are even.

const SuperHeroes = [
    {name:"Hulk",Power:98},
    {name:"Thor",Power:92},
    {name:"Spidey",Power:85},
    {name:"Cap",Power:99},
    {name:"Nat",Power:80},
];

const StrongestHeroes = SuperHeroes.filter((value)=>value.Power>80);

console.log(StrongestHeroes)

const candidates = [
    { name: "John Wick", age: 40, experience: 10, clearance: "Top Secret" },
    { name: "Ethan Hunt", age: 38, experience: 15, clearance: "Top Secret" },
    { name: "Lara Croft", age: 30, experience: 7, clearance: "Confidential" },
    { name: "James Bond", age: 45, experience: 20, clearance: "Top Secret" },
    { name: "Jason Bourne", age: 35, experience: 8, clearance: "Classified" },
    { name: "Natasha Romanoff", age: 32, experience: 12, clearance: "Top Secret" },
    { name: "Kevin McCallister", age: 12, experience: 0, clearance: "None" }
];


const topAgents = candidates.filter((value)=> value.age >= 25 && value.experience >=5 && value.clearance=="Top Secret").map(
    (value)=>({
        
            name:value.name,
            experience:value.experience,
    }
)).sort((a,b)=>b.experience-a.experience)

console.log(topAgents)

// using filter for nested-data

const students = [
    { name: "Aiden", scores: { math: 85, science: 92 } },
    { name: "Bella", scores: { math: 72, science: 89 } },
    { name: "Chris", scores: { math: 50, science: 75 } },
    { name: "Diana", scores: { math: 95, science: 90 } }
  ];

const PassedMaths = students.filter((student)=> student.scores.math >= 70)

console.log(PassedMaths)

// using filter for array inside objects

const books = [
    { title: "Learn Python", topics: ["Programming", "Python"] },
    { title: "JavaScript Mastery", topics: ["Programming", "JavaScript"] },
    { title: "Web Development", topics: ["HTML", "CSS", "JavaScript"] },
  ];

const JSBooks = books.filter((book)=>book.topics.includes("JavaScript"));

console.log(JSBooks)

// use includes() when filtering based on array elements inside object

const employees = [
    { name: "Alice", skills: ["JavaScript", "React", "Node.js"] },
    { name: "Bob", skills: ["Python", "Django"] },
    { name: "Charlie", skills: ["HTML", "CSS", "React"] },
    { name: "David", skills: ["Java", "Spring Boot"] }
  ];

  
  const ReactEmp = employees.filter((employee)=>employee.skills.length>=3).map((employee)=>{
    return{
        name:employee.name,
        TotalSkills:employee.skills.join(","),
    }
  });

  console.log(ReactEmp);