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


// HERE'S A CHEATSHEET TO UNDERSTAND FS MODULE, SPECIFICALLY USING 'FS/PROMISES' 
// fs-cheatsheet.js
const fs = require('fs/promises');

// Wrap all in an async IIFE
(async function main() {
  try {
    // 1️⃣ Read a file
    const readData = await fs.readFile('data.txt', 'utf-8');
    console.log('📖 Read:', readData);

    // 2️⃣ Write to a file (creates or overwrites)
    await fs.writeFile('notes.txt', 'Hello from Node.js!', 'utf-8');
    console.log('✍️ File written');

    // 3️⃣ Append content to file
    await fs.appendFile('notes.txt', '\nThis is new content.', 'utf-8');
    console.log('🧩 Content appended');

    // 4️⃣ Rename a file
    await fs.rename('notes.txt', 'renamed-notes.txt');
    console.log('🏷️ File renamed');

    // 5️⃣ Delete a file
    await fs.unlink('old.txt');
    console.log('🗑️ File deleted');

    // 6️⃣ Create folder (recursive)
    await fs.mkdir('logs/debug', { recursive: true });
    console.log('📁 Folder created');

    // 7️⃣ Remove folder (only if empty)
    await fs.rmdir('logs/debug');
    console.log('❌ Folder deleted');

    // 8️⃣ Read all files/folders in directory
    const items = await fs.readdir('./');
    console.log('📂 Dir contents:', items);

    // 9️⃣ Get metadata
    const stats = await fs.stat('renamed-notes.txt');
    console.log('📊 File stats:', stats.isFile(), stats.size);

  } catch (err) {
    console.error('❌ Error:', err.message);
  }
})();


// IIFE are immediated invoked function expresasion, its basically wrapping a function like this :- (function name(){})();
// it serves one primary purpose and that is that iife functions need not be called explicitly rather they are executed immediately 
// when the js file is run.