const mailgun = require("mailgun-js");

const send_email = async (to, subject, text) => {
  // console.log(message);
  try {
    const mg = mailgun({
      apiKey:
        // process.env.MAILGUN_API_KEY ||
        "c4406e7d1781e0858c690f082e102854-680bcd74-f875c2bb",
      domain:
        // process.env.MAILGUN_DOMAIN ||
        "rahmanzhalok@gmail.com",
    });

    const data = {
      from: "rahmanzhalok@gmail.com",

      to: to,

      subject: subject,

      text,
    };
    // const message = await mg.messages().send(data);
    // console.log(message);
    mg.messages().send(data, function (error, body) {
      if (error) console.log(error);
      else console.log(body);
    });
  } catch (e) {
    console.log(e);
  }
};
// send_email("zhalokrahman007@gmail.com", "hello", "testing mailgun");
module.exports = send_email;
