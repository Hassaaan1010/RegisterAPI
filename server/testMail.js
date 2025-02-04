import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "register.apibot@gmail.com",
    pass: process.env.APP_PASSWORD,
  },
});

const sendMail = async (username, email, resetLink) => {
  await transporter.sendMail({
    to: email,
    subject: "Password reset link for RegisterAPI",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h2 {
            color: #333;
          }
          p {
            color: #555;
          }
          .button {
            display: inline-block;
            padding: 12px 20px;
            background-color: #007BFF;
            color:  rgb(255, 255, 255);
            text-decoration: none;
            border-radius: 4px;
            font-size: 16px;
          }
          .footer {
            font-size: 12px;
            color: #888;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Password Reset Request</h2>
          <p>Hello <strong>${username}</strong>,</p>
          <p>We received a request to reset your password. If you did not request this, you can ignore this email.</p>
          <p>To reset your password, click the link below:</p>
          <a href="${resetLink}" class="button">Reset Your Password</a>
        </div>
      </body>
      </html>`,
  });
  console.log("sent mail");
  return true;
};

const success = await sendMail(
  "Syed Wajihuddin Hassaan",
  "hassaaan1010@gmail.com",
  "https://github.com/Hassaaan1010"
);
