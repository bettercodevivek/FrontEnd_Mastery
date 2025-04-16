// We will create a project to improve our understanding of fs module in javascript

// You'll build a mini Command Line File Manager using only the fs module and core Node.js (no external libraries).

const fs = require('fs/promises')

 console.log(process.argv)

 // process.argv jo hai yeh hume cli mein jo bhi likha hota hai usse ek array ke form mein deta hai, for example if i have written in cli 
 // like this " node file-manager.js create data2.txt 'hello i am vivek' ", and if i console.log(process.argv) , then it will give us
//  [
//     'C:\\Program Files\\nodejs\\node.exe',
//     'C:\\Users\\Vivek Singh\\Desktop\\100xJSDev\\BackendDevelopment\\Level 0\\file-manager.js',
//     'create',
//     'data2.txt',
//     'hello i am vivek'
//   ]

// now you can extract necessary information using this array and then use it to create your cli-based file-manager

const [,,command,fileName,...ContentArr] = process.argv

const content = ContentArr.join(" ")

// now we can use the above created variables for our file-manager


switch(command){
    case "create": async function createFile(){
        try{
          await fs.writeFile(fileName,content,'utf-8')
          console.log("file created successfully")
        }
        catch(err){
            console.log("error",err)
        }
     }
     createFile();
     break;

     case "read": async function readFile(){
        try{
            const data = await fs.readFile(fileName,'utf-8')
            console.log("file data read as:-",data)
        }
        catch(err){
            console.log(err)
        }
     }
     readFile();
     break;

     case "append": async function appendFile(){
        try{
            await fs.appendFile(fileName,`File appended at ${Date.UTC()} successfully !! `,'utf-8')
            console.log(`${fileName} appended !`)
        }
        catch(err){
            console.log(err)
        }
     }
     appendFile();
     break;

     case "rename": async function renameFile(){
        try{
            await fs.rename(fileName,content)
            console.log(`file renamed to ${content}`)
        }
        catch(err){
            console.log(err)
        }
     }
     renameFile();
     break;
}
