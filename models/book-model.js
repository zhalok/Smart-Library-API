const mongoose = require("mongoose");

const book_schema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publication: { type: String, required: true },
  edition: { type: Number, required: true },
  link: { type: String, required: true },
});

module.exports = mongoose.model("Books", book_schema);
