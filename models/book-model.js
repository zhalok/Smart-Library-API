const mongoose = require("mongoose");
// we are assuming that the book is already uploaded in the file server
// and the link is provided in the book collection
const book_schema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publication: { type: String, required: true },
  edition: { type: Number, required: true },
  link: { type: String, required: true },
});

module.exports = mongoose.model("Books", book_schema);
