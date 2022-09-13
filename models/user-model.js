const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  verified: { type: Boolean, required: true },
});

module.exports = mongoose.model("User", user_schema);
