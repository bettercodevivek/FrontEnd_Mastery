// Let us make a mini project based on all concepts and modules we have learnt till now :- 

// CLI Based Notes Manager

// example commands :-

// node notes.js add "shopping" "Buy milk and eggs"
// node notes.js read "shopping"
// node notes.js list
// node notes.js delete "shopping"

const fs = require('fs/promises')

const path = require('path')

// const eventEmitter = require('events')

const [,filepath,fileName,command,title,text]=process.argv

// console.log(filepath,fileName)
// console.log(filepath,command,text)

const fileDir = path.dirname(filepath);

console.log(fileDir)

async function NoteMaker(){
    try{
      await fs.writeFile(fileName,text,"utf-8")
      console.log("File Created with :- Title : ",title)
    }
    catch(err){
        console.log("Error Occured :- ",err)
    }
}

async function NoteReader(){
    try{
       const data = await fs.readFile(fileName,"utf-8");
       console.log("Data Read is :- ",data);
    }
    catch(err){
        console.log(err);
    }
}

async function NotesLister(){
    try{
     const list= await fs.readdir(filepath,"utf-8");
     for(const note of list)
        console.log(note);
    }
    catch(err){
        console.log(err)
    }
}

async function NotesRemover(){
    try{
        await fs.unlink(fileName);
        console.log("File Successfully Deleted ! , Filename:-",fileName);
    }
    catch(err){
        console.log(err);
    }
}

switch(command){
    case "add": NoteMaker();
    break;

    case "read": NoteReader();
    break;

    case "list": NotesLister();
    break;

    case "delete": NotesRemover();
    break;
}