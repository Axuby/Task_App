const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        console.log(`Email is invalid:${value}`);
      }
    }
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (value.includes("password")) {
        return new Error("Password cannot contain password");
      }
    }
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) {
        console.log("Age must be a positive number!");
      }
    }
  }
});
//methods are accessible on the instances
userSchema.methods.generateAuthToken = async ()=>{
const user = this

const token =  jwt.sign({_id:user._id.toString()},'mySecret',)
console.log(token)
return token
}
//statics are available on the model
userSchema.statics.findByCredentials = async (email,password) =>{
  
  const user = await User.findOne({email:email})
  if(!user){
    throw new Error('Cannot find User with this Email')
  } 
  const isMatched = await bcrypt.compare(password,user.password)
  if(!isMatched){
throw new Error('Unable to login')
  }
  return user
}

userSchema.pre("save", async function(next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
