// writing the user schema for creation of user model

const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
    username:{
       type:String,
       required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    }
});


// writing a pre middleware that immediately hashes the password of a new user before it gets stored in db

UserSchema.pre('save',async function(next){
    const user = this;
    const saltRounds = 10;
    try{
       const hashedPwd = await bcrypt.hash(user.password,saltRounds);
       user.password = hashedPwd;
       next();
    }
    catch(err){
        next(err);
    }
});

const User = mongoose.model('User',UserSchema);

module.exports = User ;
