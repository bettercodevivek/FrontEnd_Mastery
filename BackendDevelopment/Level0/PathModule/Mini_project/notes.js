// Let us make a mini project based on all concepts and modules we have learnt till now :- 

// CLI Based Notes Manager

// example commands :-

// node notes.js add "shopping" "Buy milk and eggs"
// node notes.js read "shopping"
// node notes.js list
// node notes.js delete "shopping"

const fs = require('fs/promises')

const path = require('path')

const eventEmitter = require('events')

const event = new eventEmitter()

event.on("read",()=>{
    const date = new Date();
    console.log("File Being Read Now at :- ", date.toLocaleString())
})

event.on("add",()=>{
    const date = new Date();
    console.log(`New Note Created with Title:${title} at ${date.toLocaleString()}`)
})


const [, , command, title, text]=process.argv

const notesDir = path.join(__dirname,"notes");

const filePath = path.join(notesDir,`${title}.txt`);

async function ensureDir(){
   await fs.mkdir(notesDir,{recursive:true});
}

async function NoteMaker(){
    try{
      await ensureDir();
      await fs.writeFile(filePath,text,"utf-8")
      console.log("File Created with :- Title : ",title)
    }
    catch(err){
        console.log("Error Occured :- ",err)
    }
}

async function NoteReader(){
    try{
       const data = await fs.readFile(filePath,"utf-8");
       console.log("Data Read is :- ",data);
    }
    catch(err){
        console.log(err);
    }
}

async function NotesLister(){
    try{
     const list= await fs.readdir(notesDir,"utf-8");
     console.log("Your Notes :- ")
     list.forEach((file,index)=>{
        console.log(`${index + 1} => ${file}`)
     })
    }
    catch(err){
        console.log(err)
    }
}

async function NotesRemover(){
    try{
        await fs.unlink(filePath);
        console.log("File Successfully Deleted ! , Filename:-",title);
    }
    catch(err){
        console.log(err);
    }
}
(async function main(){
    switch(command){
        case "add": await NoteMaker();
        event.emit(command);
        break;
    
        case "read": await NoteReader();
        event.emit(command);
        break;
    
        case "list":NotesLister();
        break;
    
        case "delete": NotesRemover();
        break;
    
        default: console.log(`unknown command given :-  
            you can run the following commands:-
            add,read,delete,list`)
    }
})();
