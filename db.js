const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(
  "mongodb+srv://suhail:353035@cluster0.azpsxjp.mongodb.net/crudapp?retryWrites=true&w=majority"
);

module.exports = { connection };
