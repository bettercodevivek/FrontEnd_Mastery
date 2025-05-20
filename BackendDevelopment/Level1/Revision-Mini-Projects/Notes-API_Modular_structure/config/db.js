const mongoose = require('mongoose');

const connectDB = async() =>{
    try{
     await mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
     });
     console.log(`Connection established with DB Successfully !!!`)
    }
    catch(err){
        console.error("Error connecting to DB", err.message);
        process.exit(1);
    }
}

modules.export = connectDB;