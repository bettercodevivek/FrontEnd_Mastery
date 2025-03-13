const name1 = "John Doe" ;

const AlertBtn = document.getElementById('alert-btn');

const Head1 = document.getElementById('head-1');

// let userName=prompt("Enter Your Name BOSS!!");


AlertBtn.addEventListener('click',()=>{
   Head1.innerText=`This page belongs to ${userName}`;
// console.log("hello");
})

const fruits = ["apple","orange","banana","kiwi"];

const FruitHeader = document.getElementById("Fruits-heading");

fruits.map((item,index)=>{
   FruitHeader.innerText=item;
});

console.log(name11);

var name11 = "vivek";
// let name22 = "sunny";
// const name33 = "money";



// var => redeclare also possible, updation also possible. 
// let => redeclaration not possible, but updation possible.
// const => neither, use when you want the data to remain unchanged

