const express = require("express");
const route = express.Router();
const admin_controller = require("../controllers/admin-controller");
route.post("/create", admin_controller.create);
// signing up as an Admin although the admin verification was not implemented because it is assumed that the admin will be verified by another admin via mongodb compass
route.get("/read", admin_controller.authorize, admin_controller.create);
// getting all the admins, but in order to call this api, a admin bearer token is needed to pass into authorization header of the request.
route.patch("/update", admin_controller.authorize, admin_controller.update);
// updating admin
route.delete("/detele", admin_controller.authorize, admin_controller.delete);
// deleting admin
route.post("/authenticate", admin_controller.authenticate);
// authenticating an admin with email and password, then recieves a jwt token as response which is later used for authorizing admin requests.

module.exports = route;
