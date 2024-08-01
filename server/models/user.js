const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  uid: {
    type: Number,
    required: false,
  },

  fname: {
    type: String,
    required: true,
  },

  lname: {
    type: String,
    required: true,
  },

  adminlevel: {
    type: String,
    required: false,
  },

  email: {
    type: String,
    required: true,
  },

  pnumber: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: false,
  },

  password: {
    type: String,
    required: true 
  }

});

const User = mongoose.model("User", userSchema);

module.exports = User;
