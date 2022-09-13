const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  verified: { type: Boolean, required: true },
  previliages: { type: [String], required: true },
});

module.exports = mongoose.model("Admin", user_schema);
