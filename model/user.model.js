const mongoose = require("mongoose");

// User Schema
const userSchema = mongoose.Schema({
  email: String,
  password: String
 
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
