const bcrypt = require("bcrypt");
const security = {};
security.hash_password = async (plain_password) => {
  const hashed_password = await bcrypt.hash(plain_password, 10);
  console.log(hashed_password);
  return hashed_password;
};

console.log(security.hash_password("030412"));

module.exports = security;
