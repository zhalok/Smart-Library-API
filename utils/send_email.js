const nodemailer = require("nodemailer");
async function sendMail(to, subject, message) {
  // console.log(to, subject, message);
  try {
    console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);
    let transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER || "rahmanzhalok@gmail.com",
        pass: process.env.EMAIL_PASS || "cvklpldvwuvspohb",
      },
    });

    const mailOptions = {
      from: "rahmanzhalok@gmail.com",
      to: to,
      subject: subject,
      text: `${message}`,
      html: `<p>${message}</p>`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.log(error);
    // return error;
  }
}

// sendMail("zhalokrahman007@gmail.com", "Email verification", "Hello bhaia ");
module.exports = sendMail;
