// establishing connection with db

const mongoose = require('mongoose');

const ConnectDB = async() => {
    try{
       await mongoose.connect('mongodb://localhost:27017/');
       console.log('Connection Established with DB Successful !')
    }
    catch(err){
        console.log("Error in establishing connection with DB", err.message);
        process.exit(1);
    }
}

module.exports = ConnectDB;