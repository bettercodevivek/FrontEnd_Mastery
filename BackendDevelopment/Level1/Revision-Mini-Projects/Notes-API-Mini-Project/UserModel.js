const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true, 
        lowercase:true
    },
    password:{
        type:String,
        required:true
    }
});


UserSchema.pre("save",async function(next){
    const user = this;

    if(!user.isModified('password')) return next();

    try{
      const saltRounds = 10;
      const hashedPwd = await bcrypt.hash(user.password,saltRounds);
      user.password=hashedPwd;
      next();
    }
    catch(err){
       next(err);
    }
});

const User = mongoose.model('User',UserSchema);

module.exports = User;