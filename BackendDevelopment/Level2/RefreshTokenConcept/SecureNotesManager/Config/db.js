const mongoose = require('mongoose');

// sabse pehle mongoose import kara code mein

const ConnectDB = async() => {
  
   // connect db ek async function rahega, because we dont want ki agar db se connection mein dikkat aajaye toh baaki aage
   // ka code block hojaye, we want this to be of non-blocking nature.

    try{
      mongoose.connect(process.env.MONGODB_URL)
      console.log("Connection with DB established successfully !")
    }
    catch(err){
        console.error("error conneccting with DB",err.message);
        process.exit(1);
    }
}

module.exports = ConnectDB;