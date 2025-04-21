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
