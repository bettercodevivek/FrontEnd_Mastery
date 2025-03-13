const name1 = "John Doe" ;

// const AlertBtn = document.getElementById('alert-btn');

// const Head1 = document.getElementById('head-1');

// let userName=prompt("Enter Your Name BOSS!!");


// AlertBtn.addEventListener('click',()=>{
//    Head1.innerText=`This page belongs to ${userName}`;
// // console.log("hello");
// })

const fruits = ["apple","orange","banana","kiwi"];

// const FruitHeader = document.getElementById("Fruits-heading");

// fruits.map((item,index)=>{
//    FruitHeader.innerText=item;
// });

// console.log(name11);

var name11;
// let name22 = "sunny";
// const name33 = "money";



// var => redeclare also possible, updation also possible. 
// let => redeclaration not possible, but updation possible.
// const => neither, use when you want the data to remain unchanged

console.log(typeof("vivek"),typeof(1000),typeof(true),typeof(name11),typeof(null),typeof([1,2,3,4,5]),typeof({username:"mahesh",age:18}));

function hello(){
   return "hello";
}

console.log(typeof(hello));

// null type is obejct due to a historical bug since inception of javascript, initially all data types were assigned type tags and values and
// for objects value was 0, null was considered as NULL Pointer so its type tag also became 0, thus it became object .