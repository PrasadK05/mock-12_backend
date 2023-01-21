const mongoose = require("mongoose");

let users = new mongoose.Schema({
  name:{ type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

let User = mongoose.model("user", users);

module.exports = User;
