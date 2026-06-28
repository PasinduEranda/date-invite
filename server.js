const express = require("express");

const nodemailer = require("nodemailer");

const cors = require("cors");

const app = express();


app.use(cors({

    origin: "*"

}));

app.use(express.json());


app.post("/send", async (req, res) => {
    try {
        const { location, date, time, plan } = req.body;

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            return res.status(500).json({
                success: false,
                error: "Missing email env variables"
            });
        }

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: "mapasindu1998@gmail.com",
            to: "mapasindu1998@gmail.com",
            subject: "New Date Plan ❤️",
            text: `Location: ${location}\nDate: ${date}\nTime: ${time}\nPlan: ${plan}`
        });

        console.log("Email sent successfully");

        res.json({ success: true });

    } catch (error) {
        console.log("EMAIL ERROR:", error);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});



const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});