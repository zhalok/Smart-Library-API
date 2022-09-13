const mongoose = require("mongoose");

const search_history_schema = new mongoose.Schema({
  search_string: { type: String, required: true },
  user_email: { type: String, required: true },
  time: { type: String, required: true },
});

module.exports = mongoose.model("Search-history", search_history_schema);
