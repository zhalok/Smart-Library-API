const express = require("express");
const route = express.Router();
const admin_controller = require("../controllers/admin-controller");
route.post("/create", admin_controller.create);
route.get("/read", admin_controller.create);
route.patch("/update", admin_controller.update);
route.delete("/detele", admin_controller.delete);
route.post("/authenticate", admin_controller.authenticate);
module.exports = route;
