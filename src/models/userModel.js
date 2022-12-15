const mongoose = require('mongoose')

const Schema =  mongoose.Schema;

/**
 * * Users
**/

const UserModel = new Schema({
  // _id: {
  //   type: Number,
  //   required: true,
  // },
  pseudo: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase:true,
    trim: true,
    match: /.+\@.+\..+/,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Employee", "User"],
    required: true,
  }

});

module.exports = mongoose.model('Users', UserModel)
