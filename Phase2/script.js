// We will now learn about prototypes in javascript.

// lets try to understand what are prototypes in simple language

// Think of every JavaScript object as a superhero. 

// Each superhero inherits powers from a mentor (a prototype).

//  If a superhero doesn’t have a power, they ask their mentor (prototype).
//  If the mentor doesn’t have it, they go to the grandmentor (prototype chain).

const Hero = {
    name:"IronMan",
    power:"Genius",
};

console.log(Hero.__proto__ === Object.prototype)

// Every object in JavaScript secretly has a prototype (a hidden mentor that can give it extra powers).

const Avenger = {
    power:"flying",
};

const IronMan = Object.create(Avenger);

IronMan.name = "Tony Stark";

console.log(IronMan.name);

console.log(IronMan.power);


// function Hero(){
//     this.name = "Thor";
// }

// Hero.prototype.weapon = "mjolnir";

// const thor = new Hero();

// Project to revise concepts till now:-  MINI AUTH SYSTEM

function AuthSystem(Username,Password){
    let Storedname=Username;
    let Storedpass=Password;
    let isLoggedIn=false;

    this.login=function(name,pass){
        if(name===Storedname && pass===Storedpass){
            isLoggedIn=true;
            console.log(`welcome sir, you have logged in as ${Storedname}`)
        }
        else{
            console.log(`Invalid Credentials Mr.${Storedname}`)
        }
    }

    this.logout=function(){
        if(isLoggedIn){
            console.log(`user logged in as ${Storedname}`)
            isLoggedIn=false
        }
        else{
            console.log("No user logged in boss !")
        }
    }
};

const user1 = new AuthSystem("Ironman","jarvis123")
const userFunc = user1.login
userFunc("Ironman","jarvis123")

// Every JavaScript object has a hidden property called [[Prototype]], which is a reference to another object.

// 💡 Think of a prototype as a "backup storage" for an object. If an object doesn’t have a property or method, it looks into its prototype to find it.

const hero1={
    model:"ironman"
};

console.log(hero1.model);

console.log(hero1.toString())

// to get prototype of an object we can either use:-
  
console.log(hero1.__proto__)

// or we can use:-

console.log(Object.getPrototypeOf(hero1))

// Let us see an example to understand how prototypes work

const avenger = {
    name:"captain america"
};

const superhero = {
    fly:function(){
        console.log("i can fly")
    }
}

Object.setPrototypeOf(avenger,superhero)

avenger.fly()

// Setting the prototype of `avenger` to `superHero`

// Every object in JavaScript has a prototype (except Object.create(null)).

// If a property/method isn’t found in the object, JavaScript looks up the prototype chain.

// Prototypes are how inheritance works in JS (before ES6 classes).

// __proto__ is used to check the prototype of an object (but prefer Object.getPrototypeOf()).

//  Prototypes allow inheritance in JavaScript


const obj1 = {
    prop1:function(){
        console.log("I am prop 1")
    }
}

const obj2 = {
    prop2:function(){
        console.log("I am prop 2")
    }
}

const obj3 = {
    myname:function(){
        console.log(" hello i am object 3")
    }
}

Object.setPrototypeOf(obj2,obj1)

Object.setPrototypeOf(obj3,obj2)

obj3.myname()

obj3.prop2()

