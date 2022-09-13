const mongoose = require("mongoose");

const read_history_schema = new mongoose.Schema({
  book_id: { type: String, required: true },
  user_email: { type: String, required: true },
  time: { type: String, required: true },
});

module.exports = mongoose.model("read-history", read_history_schema);
