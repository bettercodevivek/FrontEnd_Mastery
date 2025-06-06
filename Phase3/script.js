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


  // 3. reduce()

  // reduce() is a powerful array method that reduces an array into a single value (like a sum, product, object, or even another array).

  // syntax :- 

//   array.reduce((accumulator, currentValue, index, array) => {
//     return updatedAccumulator;
// }, initialValue);

// accumulator → Stores the result as the function runs.

// currentValue → The current item in the array.

// index (optional) → The index of the current item.

// array (optional) → The original array.

// initialValue (optional) → The starting value of the accumulator. If omitted, the first array element is used.


const numbersnew = [1, 2, 3, 4, 5];

const sum = numbersnew.reduce((acc, num) => {return acc + num}, 0);

console.log(sum); // Output: 15

const numbersnew1 = [2,4,6,8,10]

const sum1 = numbersnew1.reduce((acc,number,index)=>{
    if(index % 2 == 0){
        acc=acc+number
    }
    return acc;
},0)

console.log(sum1);

const max = numbersnew1.reduce((max,score)=>(score > max ? score : max),0)

console.log(max)

// There are 2 more applications of reduce():-

// 1. Conversion of array into object (Counting Occurences of array elements)

// 2. Flattening of array 
 

// Counting Occurences of array elements

const fruits1 = ["apple","orange","apple","orange","lemon","lemon","lemon"]

const CountFruits = fruits1.reduce((acc,fruit)=>{
    acc[fruit]=(acc[fruit] || 0)+1;
    return acc;
},{})

console.log(CountFruits)

// What does (acc[fruit] || 0) + 1 do?

//  If acc[fruit] exists, it adds 1.
//  If acc[fruit] does not exist, it starts at 0, then adds 1.


const names1 = ["john","mike","harvey","john","john","harvey"]

const namesCount = names1.reduce((acc,name)=>{
    acc[name]=(acc[name] || 0) + 1;
    return acc;
},{});

console.log(namesCount)

// Flattening an array using reduce

const nestedArr = [[1, 2], [3, 4], [5, 6]];

const flatArr = nestedArr.reduce((acc,curr)=>acc.concat(curr),[]);

console.log(flatArr)

// simply using concat(), we can flatten an array in reduce()

const threeDArray = [[[1, 2]], [[3, 4]], [[5, 6]]];

const flatArray = threeDArray.reduce((acc,curr)=>acc.concat(...curr),[]);

console.log(flatArray); 

// let us see a few more array methods now :- 

// 1.  find() → Returns the first element that matches the condition.
// 2️. findIndex() → Returns the index of the first matching element, or -1 if not found.
// 3️.  some() → Returns true if at least one element satisfies the condition.
// 4️. every() → Returns true only if all elements meet the condition


const candidates1 = [
    { name: "Alice", age: 28, experience: 6, skills: ["JavaScript", "React", "Node.js"] },
    { name: "Bob", age: 22, experience: 2, skills: ["HTML", "CSS", "JavaScript"] },
    { name: "Charlie", age: 35, experience: 10, skills: ["Python", "Django", "Machine Learning"] },
    { name: "David", age: 30, experience: 7, skills: ["JavaScript", "React", "TypeScript"] },
    { name: "Eve", age: 25, experience: 5, skills: ["JavaScript", "Vue", "Node.js"] }
  ];

  
//   Your Tasks:

//  find() → Find the first candidate with React in their skills.
//  findIndex() → Find the index of the first candidate with less than 3 years of experience.
//  some() → Check if at least one candidate is skilled in Machine Learning.
//  every() → Verify if all candidates have at least 2 skills.

const reactDev = candidates1.find(candidate1=>candidate1.skills.find(skill=>skill==="React"));

const juniorDevIndex = candidates1.findIndex(candidate1=>candidate1.experience < 3);

const hasMLExpert = candidates1.some(candidate1=>candidate1.skills.find(skill=>skill==="Machine Learning"))

const allHaveSkills =candidates1.every(candidate1=>candidate1.skills.length > 2)


// Your implementation is solid and works as expected. Just a tiny optimization suggestion:

// Instead of using .find(skill => skill === "React"), you can directly use .includes("React") for better readability and efficiency.

console.log(reactDev);
console.log(juniorDevIndex);
console.log(hasMLExpert);
console.log(allHaveSkills);


// Now, we will learn sorting in js in detail

// JavaScript has a built-in sort() method for arrays.

// By default, sort() converts elements to strings and then sorts them lexicographically (like dictionary order).

// Here are some key points:

//     Sorts in-place: This means it modifies the original array.

//     Default sorting: By default, .sort() converts elements to strings and compares them lexicographically (i.e., alphabetically).

// 1. SORTING ARRAY OF NUMBERS

// in ascending

const nums1 = [10, 5, 100, 1];
nums1.sort((a, b) => a - b); 
console.log(nums1); 


// so basically, compare function needs to be used to sort a numerical array , compare function is => (a,b)=>a-b or b-a , now
// it is important to understand here, that what the compare function in doing in js under the hood.

// So, js basically takes any 2 random elements in the array as a and b, they need not be adjacent and compares them based on given
// condition whether a-b or b-a , and it does it till the whole array is sorted.

// if a-b > 0, it means a comes after b.

// if a-b < 0 , it means a comes before b;

// Compare 10 and 5: a - b = 10 - 5 = 5 (positive, so 5 comes before 10).

// Compare 10 and 100: a - b = 10 - 100 = -90 (negative, so 10 stays before 100).

// Compare 100 and 1: a - b = 100 - 1 = 99 (positive, so 1 comes before 100).

const nums2 = [24,12,54,67,11,15];

nums2.sort((a,b)=>a-b)

console.log(nums2)

// 2. SORTING ARRAY OF OBJECTS

// To sort arrays of objects, you’ll typically want to sort by a property. 
// You can use a compare function to specify how you want to compare the objects.

const peoples = [
    {name:"john",age:25},
    {name:"harvey",age:12},
    {name:"mike",age:20}
]

peoples.sort((a,b)=>a.age-b.age)

console.log(peoples)

// here we are sorting people on the basis of their ages in ascending order, but if we just give sort() without any compare
// function , it would by default sort them on basis of names (alphabetically).

// challenge 1

const srtbooks = [
    { title: "Book A", year: 2020 },
    { title: "Book B", year: 2015 },
    { title: "Book C", year: 2018 }
];


srtbooks.sort((a,b)=>a.year-b.year)

console.log(srtbooks)