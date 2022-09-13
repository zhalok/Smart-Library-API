const jwt = require("jsonwebtoken");
const token = {};
token.token_generator = (payload) => {
  return jwt.sign(payload, process.env.SECRET, {
    expiresIn: "2 days",
  });
};
token.token_verification = async (token) => {
  try {
    const decoded = await jwt.verify(token, process.env.SECRET);
    const exp = decoded.exp;
    const cur_time = Math.floor(new Date().getTime() / 1000);
    console.log(exp, cur_time);
    if (cur_time <= exp) return decoded;
    else return false;
  } catch (e) {
    return false;
  }
};
module.exports = token;
