const nodemailer = require('nodemailer');
const {EMAIL_HOST, EMAIL_PASSWORD, EMAIL_PORT, EMAIL_USER} = require('../config/config.js');

const EmailSend = async (EmailTo, EmailText, EmailSubject, EmailHTMLBody) => {
    const transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        secure: false,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false
        },
    });

    const mailOptions = {
        from: EMAIL_USER, to: EmailTo, subject: EmailSubject, text: EmailText, html: EmailHTMLBody
    };

    try {
        await transporter.sendMail(mailOptions);
        return true
    } catch (error) {
        console.log(error)
        return false;
    }
};

module.exports = EmailSend;
