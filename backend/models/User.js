const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    minlength: 3
  },
  last_name: {
    type: String,
    required: true,
    default: null,
    minlength: 3
  }, 
  email: {
    type: String,
    trim: true,
    required: [true, 'Email is required'],
    validate: validator.isEmail,
    unique: [true, 'Email already exists'],
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, 'Password is required'],
  },
  token: { type: String },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;