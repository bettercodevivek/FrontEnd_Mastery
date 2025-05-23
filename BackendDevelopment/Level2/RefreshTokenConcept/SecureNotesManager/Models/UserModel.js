// ab UserSchema banayenge and usse UserModel Create Karenge

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        split:true,
        required:true
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

// before creating the model,hum ek pre-middleware likhenge , jiska sirf ek hi kaam hoga, user signup hua toh password hash hojaye uska
// password hashing before it gets saved to DB, for hashing we will use bcryptjs.

UserSchema.pre('save',async function(next){
    const user = this;
    const SaltRounds = 10;
    try{
     const hashedPwd = await bcrypt.hash(user.password,SaltRounds);
     user.password = hashedPwd;
     next();
    }
    catch(err){
      next(err);
    }
})

const UserModel = mongoose.Model('User',UserSchema);

module.exports = UserModel;