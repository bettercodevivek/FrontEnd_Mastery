const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        split:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

UserSchema.pre('save',async function(next){
   
    const user = this;

   try{
     const saltRounds = 10;

     const hashedpwd = await bcrypt.hash(user.password,saltRounds);

     user.password = hashedpwd;
     
     next();
   }
   catch(err){
    next(err);
   }
});

const User = mongoose.model('User',UserSchema);

module.exports = User;