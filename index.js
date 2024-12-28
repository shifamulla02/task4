const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/se", (req, res) => {
  let data = [req.body.name, req.body.phone, req.body.query];
  console.log(data);
  
  // From email address (your email)
  let from = "shiifaa.mulla@gmail.com";  // Sender email address
  
  // To email address (where the email is sent to)
  let to = "shiifaa.mulla@gmail.com";  // This should be the same as 'from' to send to yourself
  
  // Subject and text content of the email
  let subject = "Enquiry Form: " + req.body.name;
  let text = "Name: " + req.body.name + "\nPhone: " + req.body.phone + "\nQuery: " + req.body.query;

  // Create a transport for sending the email using Gmail
  let transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shiifaa.mulla@gmail.com",
      pass: "wznimvrrwbyxidro",   
    },
  });

  // Email options
  let mailOptions = {
    from: from,
    to: to,  // This sends the email to your own email address
    subject: subject,
    text: text,
  };

  // Send the email
  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.status(500).json(err);  // If there's an error, send a failure response
    } else {
      res.status(200).json("Mail sent successfully");  // Success response
    }
  });
});

// Start the server
app.listen(9000, () => {
  console.log("Server running at http://localhost:9000");
});
