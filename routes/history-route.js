const express = require("express");
const route = express.Router();
const book_controller = require("../controllers/book-controller");

route.get("/read", user_controller.authorize, book_controller.view_recent);
route.get("/search", user_controller.authorize, book_controller.search_history);

module.exports = route;
