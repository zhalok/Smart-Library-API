const bcrypt = require("bcrypt");

const user_model = require("../models/user-model");
const otp_model = require("../models/otp-model");
const otp_generator = require("../utils/otp_generator");
const admin_model = require("../models/admin-model");
const { token_generator, token_verification } = require("../utils/token");
const { default: axios } = require("axios");

const user_controller = {};
user_controller.create = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const prev_docs = await user_model.find({ email });
    if (prev_docs.length != 0) {
      res.status(409).json({ message: "email already exists" });
      return;
    }
    const hashed_password = await bcrypt.hash(password, 10);
    const new_user = new user_model({
      name,
      email,
      password: hashed_password,
      verified: false,
    });
    const new_user_docs = await new_user.save();
    const otp = otp_generator.generate();
    console.log(otp);
    const new_otp = new otp_model({
      otp: otp.otp,
      exp: otp.expiration_time,
      email,
    });
    await new_otp.save();
    // email verification via sending otp in the email of the user.
    axios
      .post(
        "https://smartlibmailer.herokuapp.com/send",
        {
          to: email,
          subject: "Email Verification",
          message: `http://localhost:5000/api/user/verify?otp=${otp.otp}`,
        },
        {
          headers: {
            apikey: process.env.EMAIL_API_KEY,
          },
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    const admins = await admin_model.find({});
    // notifiying the admins about the user accout creation
    axios
      .post(
        "https://smartlibmailer.herokuapp.com/send",
        {
          to: admins[0].email,
          subject: "New User Registraion",
          message: `A new user named ${name} registered just now`,
        },
        {
          headers: {
            apikey: process.env.EMAIL_API_KEY,
          },
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    res.status(200).json(new_user_docs);
  } catch (e) {
    next(e);
  }
};
user_controller.read = (req, res, next) => {};
user_controller.update = (req, res, next) => {};
user_controller.delete = (req, res, next) => {};
user_controller.verify = async (req, res, next) => {
  const { otp } = req.query;
  console.log(otp);
  const cur_otp = await otp_model.find({});
  console.log(cur_otp);
  const cur_time = Math.floor(new Date().getTime() / 1000);
  if (parseInt(cur_time) <= parseInt(cur_otp[0].exp)) {
    await user_model.findOneAndUpdate(
      { email: cur_otp[0].email },
      { verified: true },
      { new: true }
    );
    await otp_model.deleteOne({ otp });
    res.status(200).json({ message: "Email verified" });
  } else {
    await otp_model.deleteOne({ otp });
    res.status(200).json({ message: "OTP expired" });
  }
};
user_controller.authenticate = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const users = await user_model.find({ email });
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
        type: "user",
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
user_controller.authorize = async (req, res, next) => {
  try {
    const token_header = req.headers.authorization;
    if (!token_header) {
      res.status(401).json({ message: "Token not found" });
      return;
    }
    const token = token_header.split(" ")[1];
    // console.log(token_header);

    const decoded_token = await token_verification(token);

    if (
      decoded_token &&
      (decoded_token.type == "user" || decoded_token.type == "admin")
    ) {
      // console.log(decoded_token);
      // res.status(200).json(decoded_token);
      req.body["user_email"] = decoded_token.email;
      next();
    } else {
      res.status(401).json("Invalid token");
    }
    // res.end();
  } catch (e) {
    res.json(e);
  }
};
module.exports = user_controller;
