const mongoose = require('mongoose')
const { isEmail } = require('validator')

const Schema =  mongoose.Schema;

/**
 * * Users
**/

const UserModel = new Schema({
  // id: {
  //   type: Number,
  // },
  pseudo: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate: [isEmail , 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Employee", "User"],
    required: true,
    default: "User",
  }

});

module.exports = mongoose.model('Users', UserModel)
