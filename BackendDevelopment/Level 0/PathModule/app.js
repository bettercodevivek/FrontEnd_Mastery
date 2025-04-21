// What is path module

//Node.js ka path module system file paths ko handle karne ke liye use hota hai. Whether you're joining paths, 
// getting file extensions, or resolving relative paths — ye sab kuch easy banata hai.

// But why do we need it, real life project mein kaha use hoga

// lets take an example:- hum koi aisi application build kare jisme user kuch upload kar sake, anything , resume, images etc.
// so, server side file storage hoyegi matlab, ab jab file aayegi server pe, toh obviously kisi directory mein store hogi woh
// and ek particular file path hoga , ab normally woh file path local system pe sahi resolve hoke work karega but cross-platform issues
// arise ho sakte hai, to avoid that we prefer using path module and its important methods

// what can happen if we dont use path module for handling file paths ?

// 1. Code Will Break on Different Operating Systems

// fs.writeFileSync("uploads\\image.png",data);
// Above can work on windows but will break on linux, because it expects / as path separator

// 2. You Might Accidentally Write Outside Your Project

// If you don’t use __dirname or path.resolve, you might be writing files outside your app folder without realizing it 

// fs.writeFileSync("myfile.txt", "data");

// This will save the file in whatever folder your Node process was run from, which could vary across:

// Local development

// Production server

// Docker environment

// Result? You spend 3 hours asking, Bhai file gaya kahan?? 

// 3. Relative Paths Become Confusing and Fragile

// 4. Poor Maintainability in Team Projects

// Now that we know that it is important to use path module in production level code for above mentioned reasons, we will see
// important path module methods:-

const path = require('path');

// const fs = require('fs/promises')
// 1. path.join()

// Safely joins folder paths — handles / or \ automatically

const filePath = path.join("folder","subfolder","data.txt");

// (async function FileMaker(){
//    try{
//     await fs.writeFile(filePath,"Wrote this file")
//     console.log(`file created at ${filePath}`)
//    }
//    catch(err){
//     console.log(err)
//    }
// })();

// Use case: Creating cross-platform friendly paths for saving files

// toh agar upar ke example ko dekhe, path.join() se we can simply create a file path, and then we can store it in a variable and
// we can use it to pass it as an argument in other methods where we might need a file path, for example:- writeFile(), it will
// write the file in that path, now why is it good, it makes the code cleaner and easier to resolve in future.

// 2. path.resolve()

// Builds an absolute path starting from current file or root

const absPath = path.resolve("folder","data1.txt")
console.log(absPath)

// Use case: When you want full path for reading/writing files

// 3. path.basename(filepath)

// Gets the filename from a path

const fileName = path.basename("BackendDevelopment/Level 0/PathModule/folder/subfolder/data.txt")
console.log(fileName)

// when file path is like this by default => (BackendDevelopment\Level 0\PathModule\folder\subfolder\data.txt), meaning \ is used
// as separator , it creates a problem as in most langs including js \ is an escape sequence which leads the language to interpret it differently
// leading to errors, so to fix this:- either replace \ with /  or use \\ .

// 4. path.extname(filepath)

// Gets the extension of a file

// Validate file types (e.g., only allow .jpg, .png, etc)

const extname = path.extname("BackendDevelopment/Level 0/PathModule/folder/subfolder/data.txt")

console.log(extname) // gives .txt

// 5. path.dirname(filepath)

// Gets the directory part of a path

// Useful when you want to check or create parent folders

const dirname = path.dirname("BackendDevelopment/Level 0/PathModule/folder/subfolder/data.txt")

console.log(dirname)

