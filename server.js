const express = require("express");

const nodemailer = require("nodemailer");

const cors = require("cors");

const app = express();

app.use(cors({

    origin: "*"

}));

app.use(express.json());

app.post("/send", async (req, res) => {

    const { location, date, time, plan } = req.body;

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "New Date Plan ❤️",
        text: `
Location: ${location}
Date: ${date}
Time: ${time}
Plan: ${plan}
        `
    };

    try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    res.json({ success: true });
} catch (error) {
    console.log("EMAIL ERROR:", error);
    res.json({ success: false, error: error.message });
}
});

app.listen(5501, () => {
    console.log("Server running on https://date-invite-production.up.railway.app/send");
});