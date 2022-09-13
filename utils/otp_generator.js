const otp_generator = {};

otp_generator.generate = () => {
  const otp = Math.floor(Math.random() * 600000 + 600000);
  const expiration_time = Math.floor(new Date().getTime() / 1000) + 60;
  return { otp, expiration_time };
};

console.log(otp_generator.generate());

module.exports = otp_generator;
