const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
  otp: { type: String, required: true },
  exp: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model("otps", user_schema);
