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