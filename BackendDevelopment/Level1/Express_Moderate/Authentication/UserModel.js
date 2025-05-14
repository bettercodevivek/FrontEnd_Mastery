// As we have understood CRUD operations perfectly using mongoose, now next step is to learn to implement authentication and hashing
// passwords using bcrypt

// Step 1: Create a User Schema and Model
// In MongoDB, we need to store user data like:
// username , email (must be unique) , password (should be hashed before saving)

// Why Hash the Password?
// Storing plain passwords = security risk!
// Even if someone hacks your DB, they shouldn’t be able to read real passwords.
// We’ll use bcryptjs to:
// Hash passwords before saving
// Compare hashed password with raw password during login4

// Behind the Scenes Flow:
// User sends password as plain text (password: "123456").
// We hash it using bcrypt.hash(password, saltRounds).
// Hashed password is stored in MongoDB.
// During login → we compare the password the user entered with the hashed version using bcrypt.compare().

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
        required:true,
    }
});

// pre-save middleware that will hash password before storing it in DB

UserSchema.pre('save',async function(next){
    const user = this;

    if(!user.isModified('password')) return next();

    try{
     const saltRounds = 10;
     const hashedPassword = await bcrypt.hash(user.password,saltRounds);
     user.password = hashedPassword;
     next();
    }
    catch(err){
      next(err);
    }
});

const User = mongoose.model('User',UserSchema);

module.exports = User;