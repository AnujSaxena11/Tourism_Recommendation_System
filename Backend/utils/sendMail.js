const nodemailer = require("nodemailer");

let transporter = null;
if(process.env.EMAIL_USER && process.env.EMAIL_PASS){
    transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
}

async function sendEmail(to, subject, text){
    if(!transporter){
        throw new Error("Email transporter is not configured");
    }
    try{
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        });
        console.log("Email Sent");
    }
    catch(e){
        throw new Error("Email delivery failed", { cause: e });
    }
}

module.exports = sendEmail;