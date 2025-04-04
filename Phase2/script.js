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

// ULTIMATE PROTOTYPE CHALLENGE

// Create a Multi-Level Prototype Chain for a Gaming Character System

// 1. Create a BaseCharacter constructor function with:
//     name, level properties
//     attack() method that logs "🗡️ <name> attacks at level <level>!" 

function BaseChar(name,level){
    this.name=name;
    this.level=level;
}

BaseChar.prototype.attack = function(){
    console.log(`${this.name} attacks at level ${this.level}`)
}


// 2️. Create a Warrior constructor that inherits from BaseCharacter and adds:
//     weapon property
//     battleCry() method that logs "⚔️ <name>: For glory!"

function warrior(name,level,weapon){
    this.weapon=weapon;
    BaseChar.call(this,name,level);
}


warrior.prototype=Object.create(BaseChar.prototype);

warrior.prototype.constructor=warrior;

warrior.prototype.battleCry=function(){
    console.log(`${this.name}: For glory!`)
}



// 3. Create a Mage constructor that inherits from BaseCharacter and adds:
//     spell property
//     castSpell() method that logs "✨ <name> casts <spell>!"

function Mage(name,level,spell){
    this.spell = spell;
    BaseChar.call(this,name,level);
}


Mage.prototype=Object.create(BaseChar.prototype);

Mage.prototype.constructor=Mage;

Mage.prototype.castSpell=function(){
    console.log(`${this.name} casts ${this.spell}`)
}

const warrior1 = new warrior("Thor", 10, "Mjolnir");
warrior1.attack();      // 🗡️ Thor attacks at level 10!
warrior1.battleCry();   // ⚔️ Thor: For glory!
console.log(warrior1.weapon);  // Mjolnir

const mage1 = new Mage("Doctor Strange", 15, "Time Manipulation");
mage1.attack();        // 🗡️ Doctor Strange attacks at level 15!
mage1.castSpell();     // ✨ Doctor Strange casts Time Manipulation!
console.log(mage1.spell);  // Time Manipulation


// lets learn about ES6 inheritance and classes.

// But what is actually ES6 ?

// so, ES6 is the biggest updated version of javascript that came in 2015, and as its ECMAScript  version 6, its called ES6.

// Inheritance means one class can take properties and methods from another class.

// 1. CREATING A BASE CLASS 

class BaseCharacter {
    constructor(name,level){
       this.name=name;
       this.level=level;
    }

    attack(){
        console.log(`${this.name} attacks at level => ${this.level} !`)
    }
}

const hero = new BaseCharacter("thor",10);
hero.attack();


class Warrior extends BaseCharacter {
    constructor(name,level,weapon){
         super(name,level);
         this.weapon=weapon;
    }
    battleCry(){
        console.log(`${this.name}: For Gloryyyyy!!!`)
    }
}

const warrior01 = new Warrior("cap",20,"Shield");

warrior01.battleCry();
warrior01.attack();

class mage extends BaseCharacter{
    constructor(name,level,spell){
         super(name,level);
         this.spell=spell;
    }
    CastSpell(){
        console.log(`${this.name} casts ${this.spell}!`)
    }
}

const Mage01 = new mage("strange",100,"magic");

Mage01.attack();


// function Vehicle(type,speed){
//     this.speed=speed;
//     this.type=type;
// }

// Vehicle.prototype.drive=function(){
//     console.log(`The ${this.type} is driving at speed  ${this.speed} km/h`)
// }

// Challenge = Now extend Superhero to create a Mutant superhero with an extra mutation property!

function Superhero(name,power){
   this.name=name;
   this.power=power;
}

Superhero.prototype.fight=function(){
    console.log(`${this.name} fights with power level ${this.power}!`)
}

function Wolverine(name,power,mutation){
    Superhero.call(this,name,power);
    this.mutation=mutation;
}

Wolverine.prototype=Object.create(Superhero.prototype);

Wolverine.prototype.constructor=Wolverine;

const Wolv1 = new Wolverine("xmen",200,"regenration");

console.log(Wolv1.name,Wolv1.power,Wolv1.mutation);

Wolv1.fight();


// CHALLENGE 1 TO MASTER ES6 CLASSES

// Objective:

//     Create a Superhero class with name, power, and an attack() method.
//     Create a Mutant class that inherits from Superhero and adds mutation.
//     Add a mutate() method to Mutant.

class Superhero1{
    constructor(name,power){
        this.name=name;
        this.power=power;
    }
    attack(){
        console.log(`${this.name} attacks with power => ${this.power}`)
    }
    describe(){
        console.log(` ${this.name} is a superhero with ${this.power} power!`);
    }
}

class Mutant extends Superhero1{
    constructor(name,power,mutation){
        super(name,power);
        this.mutation=mutation;
    }
    mutate(){
        console.log(`${this.name} can mutate into ${this.mutation}`)
    }
}

const Mutant1 = new Mutant("Ninja",100,"Regeneration");
Mutant1.describe();
Mutant1.attack();
Mutant1.mutate();

// CHALLENGE 2

// Objective:

//     Create a Vehicle class with type, speed, and a drive() method.
//     Create a ElectricVehicle class that inherits from Vehicle and adds batteryLife.
//     Add a chargeBattery() method to ElectricVehicle.


class Vehicle1{
    constructor(type,speed){
        this.type=type;
        this.speed=speed;
    }
    drive(){
        console.log(`${this.type} drives at this speed => ${this.speed}`)
    }
}

class ElectricVehicle extends Vehicle1{
    constructor(type,speed,batterylife){
        super(type,speed);
        this.batterylife=batterylife;
    }
    chargeBattery(){
        console.log(`${this.type} has a battery life of => ${this.batterylife}`)
    }
}

const EV1 = new ElectricVehicle("Windsor",100,500);
EV1.drive();
EV1.chargeBattery();
