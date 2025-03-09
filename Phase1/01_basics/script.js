const name1 = "John Doe" ;

const AlertBtn = document.getElementById('alert-btn');

const Head1 = document.getElementById('head-1');

AlertBtn.addEventListener('click',()=>{
   Head1.innerText=`This page belongs to ${name1}`;
// console.log("hello");
})