const mongoose = require("mongoose");
const { conn } = require('../connection/connection');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  token: {
    type: String,
  },
  password: {
    type: String,
  },
  phone: {
    type: Number,
  }
},{
    versionKey: false,
    collection: 'user'
});

// const user = mongoose.model("user", userSchema);

exports.userModel = conn.model("User", userSchema);