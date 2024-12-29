const sendEmail = async (email, subject, text) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rashmikalsariya02@gmail.com",
      pass: "guuh xohd sutb zxhd",
    },
  });

  let mailOptions = {
    from: "rashmikalsariya02@gmail.com",
    to: email,
    subject: subject,
    text: text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
