import nodemailer from "nodemailer";

var transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST, //ANCHE QUESTO DA FARE PROCESS.ENV
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

export default transport;
