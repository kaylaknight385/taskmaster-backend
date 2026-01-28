const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

// this runs automatically before saving a user to the database
userSchema.pre('save', async function(next) {
  // if the password wasn't changed, skip this whole thing
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    // make a salt - basically random data to make the hash more secure
    const salt = await bcrypt.genSalt(10);
    
    // turn the plain text password into a hashed version
    this.password = await bcrypt.hash(this.password, salt);
    
    next();
  } catch (error) {
    next(error);
  }
});

// helper method to check if login password matches the hashed one
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
