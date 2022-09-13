const express = require("express");
const route = express.Router();
const book_controller = require("../controllers/book-controller");
const admin_controller = require("../controllers/admin-controller");
const user_controller = require("../controllers/user-controller");
route.post("/create", admin_controller.authorize, book_controller.create);
route.get("/read", user_controller.authorize, book_controller.read);
route.get("/read/:id", user_controller.authorize, book_controller.read_by_id);
route.patch("/update", admin_controller.authorize, book_controller.update);
route.delete("/delete/:id", admin_controller.authorize, book_controller.delete);
route.post("/search", user_controller.authorize, book_controller.search);
route.post("/filter", user_controller.authorize, book_controller.filter);

module.exports = route;
