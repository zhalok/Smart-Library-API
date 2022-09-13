const admin_model = require("../models/admin-model");
const { token_verification, token_generator } = require("../utils/token");
const bcrypt = require("bcrypt");
const admin_controller = {};
admin_controller.create = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const prev_docs = await admin_model.find({ email });
    if (prev_docs.length != 0) {
      res.status(409).json({ message: "email already exists" });
      return;
    }
    const hashed_password = await bcrypt.hash(password, 10);
    const new_admin = new admin_model({
      name,
      email,
      password: hashed_password,
      verified: false,
      previliages: ["add book", "delete book", "update book"],
    });
    const new_admin_doc = await new_admin.save();
    res.status(200).json(new_admin_doc);
  } catch (e) {
    next(e);
  }
};
admin_controller.read = (req, res, next) => {};
admin_controller.update = (req, res, next) => {};
admin_controller.delete = (req, res, next) => {};
admin_controller.authenticate = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);
    const users = await admin_model.find({ email });
    if (users.length == 0) {
      res.status(401).json({ message: "Invalid Credentials" });
      return;
    }
    const hashed_password = users[0].password;
    const validity = await bcrypt.compare(password, hashed_password);
    if (validity) {
      const payload = {
        name: users[0].name,
        email: users[0].email,
        verified: users[0].verified,
        type: "admin",
      };
      const token = token_generator(payload);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
      return;
    }
  } catch (e) {
    next(e);
  }
};
admin_controller.authorize = async (req, res, next) => {
  try {
    const token_header = req.headers.authorization;
    if (!token_header) {
      res.status(401).json({ message: "Token not found" });
      return;
    }
    const token = token_header.split(" ")[1];
    console.log(token);
    // console.log(token_header);

    const decoded_token = await token_verification(token);
    console.log(decoded_token);
    if (decoded_token && decoded_token.type == "admin") {
      // res.status(200).json(decoded_token);

      next();
    } else {
      res.status(401).json("Invalid token");
    }
    // res.end();
  } catch (e) {
    console.log(e);
    res.json(e);
  }
};
module.exports = admin_controller;
