const lcs = require("node-lcs");
const book_model = require("../models/book-model");
const search_history_model = require("../models/search-history-model");
const read_history_schema = require("../models/read-history-model");
const bookModel = require("../models/book-model");
const book_controller = {};
book_controller.create = async (req, res, next) => {
  try {
    const { name, author, genre, publication, edition, link } = req.body;
    const new_book = new book_model({
      name,
      author,
      genre,
      publication,
      edition,
      link,
    });
    const newly_saved_book = await new_book.save();
    res.status(200).json(newly_saved_book);
  } catch (e) {
    next(e);
  }
};
book_controller.read = async (req, res, next) => {
  try {
    const books = await book_model.find({});
    console.log(books);
    res.json(books);
  } catch (e) {
    next(e);
  }
};
book_controller.read_by_id = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_email } = req.body;
    let books = await book_model.find({ _id: id });
    const new_read_history = new read_history_schema({
      book_id: id,
      user_email,
      time: new Date(),
    });
    await new_read_history.save();
    res.status(200).json(books);
  } catch (e) {
    next(e);
  }
};
book_controller.search = async (req, res, next) => {
  try {
    let { name, user_email } = req.body;
    name = name.trim();
    const books = await book_model.find({});
    let matched_books = [];
    for (let i = 0; i < books.length; i++) {
      const book_name = books[i].name;
      const lcs_match = lcs(book_name, name);
      if (lcs_match.length) {
        matched_books.push({
          book: books[i],
          lcs_len: lcs_match.length,
          book_len: book_name.length,
        });
      }
      matched_books = matched_books.sort((a, b) =>
        a.lcs_len == b.lcs_len ? b.book_len - a.book_len : a.lcs_len - b.lcs_len
      );
      matched_books = matched_books.map((a) => a.book);
      const new_search_history = new search_history_model({
        search_string: name,
        user_email,
        time: `${new Date()}`,
      });
      await new_search_history.save();
      res.status(200).json(matched_books);
    }
  } catch (e) {
    next(e);
  }
};
book_controller.filter = async (req, res, next) => {
  try {
    const { name, author, genre, publication, edition } = req.body;
    let books = await book_model.find({});

    if (name) books = books.filter((e) => e.name == name);
    if (author) books = books.filter((e) => e.author == author);
    if (genre) books = books.filter((e) => e.genre == genre);
    if (publication) books = books.filter((e) => e.publication == publication);
    if (edition) books = books.filter((e) => e.edition == edition);

    res.status(200).json(books);
  } catch (e) {
    next(e);
  }
};
book_controller.update = async (req, res, next) => {
  try {
    const { book_id, new_book_data } = req.body;
    const updated_book = await book_model.findByIdAndUpdate(
      { _id: book_id },
      new_book_data,
      {
        new: true,
      }
    );
    res.status(200).json(updated_book);
  } catch (e) {
    next(e);
  }
};
book_controller.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    await book_model.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Deleted" });
  } catch (e) {
    next(e);
  }
};
module.exports = book_controller;
