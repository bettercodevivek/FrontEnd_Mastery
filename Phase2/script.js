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

function Villain(name,evilPlan){
    this.name=name;
    this.evilPlan=evilPlan;
}

Villain.prototype.laugh=function(){
    console.log("eery laugher of villain")
};

function SuperVillain(name,evilPlan,powerLevel){
    Villain.call(this,name,evilPlan);
    this.powerLevel=powerLevel;
}

// Set up prototype inheritance
SuperVillain.prototype = Object.create(Villain.prototype);
SuperVillain.prototype.constructor = SuperVillain; // this lines resets the constructor back to supervillain because when Object.create()
// is used, it sets the constructor for supervillain to villain, which is wrong.


SuperVillain.prototype.destroyWorld=function(){
    console.log(" i will destroy the wrold")
};

const thanos = new SuperVillain("Thanos","Destroy world","infinity")

console.log(thanos.name);  // ✅ "Thanos"
console.log(thanos.evilPlan);  // ✅ "Erase half the universe"
console.log(thanos.powerLevel);  // ✅ "Infinity"

thanos.laugh();
thanos.destroyWorld();


// Prototyping ka matlab hi yeh hai ki aapne 2 objects ke beech inheritance ka ek relationship create kardiya hai,

// protoype kuch nahi khd ek object hai, agar aapke paas 2 objects hai obj1 and obj2 and obj1 ka prototype hum obj2 set karde
// toh, obj1, obj2 ki props inherit karlega. simple as that !!!!

/* 
These lines set up inheritance so SuperVillain can use methods from Villain.
🔹 First Line: SuperVillain.prototype = Object.create(Villain.prototype);

✔️ Object.create(Villain.prototype) creates a new empty object that inherits from Villain.prototype.
✔️ We assign this new object to SuperVillain.prototype, so now SuperVillain inherits all methods from Villain.

👉 Without this line, SuperVillain would not inherit anything from Villain.
🔹 Second Line: SuperVillain.prototype.constructor = SuperVillain;

✔️ After setting up inheritance, SuperVillain.prototype.constructor gets overwritten (it now points to Villain because of Object.create()).
✔️ This line restores the correct constructor reference.
 */

// Prototype Chain

// Whenever you access a property/method on an object, JavaScript first looks in the object itself.

// If it doesn’t find it, it goes up the prototype chain until:
// ✅ It finds the property → Returns it
// ❌ It reaches null → Returns undefined

const GrandParent = {
    LastName:"wayne",
}

const Parent = Object.create(GrandParent);

Parent.FirstName = "Thomas";

const Child = Object.create(Parent);

Child.nickname = "Batkid";

console.log(Child.nickname);

console.log(Child.FirstName);

console.log(Child.LastName);

console.log(Child.age);

// Toh isse simple words mein samjho, humne child object create kara from parent , basically making parent as its mentor(prototype) and we did the same for
// parent with grandparent toh ho kya raha hai ki, Child ne parent ki saari properties inherit kari and parent ne grandparent ki, which means when we search for
// a property in child object, JS will first look up in the obejct itself, then up in the prototype chain it will look in parent object, then further in grandparent
// object and finally then in Object.prototype, but after this it becomes null.

// child → parent → grandparent → Object.prototype → null

// There are 2 ways to create prototype of an object, or should we say to set an object as prototype of another:-

// 1. Object.create() method

// This approach is used when you are creating a new object and want to set the prototype of that object during the creation itself.

// Example code snippet :- 

const MyObj1 = {
    MyName1:"Josh M",
};

const MyObj2 = Object.create(MyObj1);
MyObj2.MyName2 = "Dave S";

console.log(MyObj2.__proto__ == MyObj1) // gives true

// 2. Object.setPrototypeOf()

const Myobj3 = {
    Myname3 : "Walter W",
};

const Myobj4 = {
    Myname4 : "Jesse P",
};

Object.setPrototypeOf(Myobj4,Myobj3);

console.log(Myobj4.__proto__ == Myobj3) // gives true

// When to use which one if they both do the same work:-

// Both do the same thing, but Object.create(obj1) is recommended because: ✔️ It directly sets the prototype at object creation (more efficient).
// ✔️ Object.setPrototypeOf(obj2, obj1) is slower because it changes the prototype after the object is created, which JavaScript engines don’t optimize well.