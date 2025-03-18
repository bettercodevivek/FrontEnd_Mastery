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



