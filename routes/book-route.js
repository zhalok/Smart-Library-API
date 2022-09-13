const express = require("express");
const route = express.Router();
const book_controller = require("../controllers/book-controller");
const admin_controller = require("../controllers/admin-controller");
const user_controller = require("../controllers/user-controller");
route.post("/create", admin_controller.authorize, book_controller.create);
// adding a book to the library. Only the admins can do it, therefore this api can be only authorized with admin token.
route.get("/read", user_controller.authorize, book_controller.read);
// getting the list of all the available books in the library. this api is authorized by user token
route.get("/read/:id", user_controller.authorize, book_controller.read_by_id);
// getting a particular book for reading. this api is authorized by user token
route.patch("/update", admin_controller.authorize, book_controller.update);
// updating a book. this api is authorized by admin token as only admins can update a book
route.delete("/delete/:id", admin_controller.authorize, book_controller.delete);
// deleting a book. this api is authorized by admin token as only admins can delete a book
route.post("/search", user_controller.authorize, book_controller.search);
// searching a book. this api is authorized by user token.
route.post("/filter", user_controller.authorize, book_controller.filter);
// filtering by criterias. this api is authorized by user token.

// ** an admin token also can be used as a user token
module.exports = route;
