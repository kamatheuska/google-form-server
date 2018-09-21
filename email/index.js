'use strict'
const nodemailer = require('nodemailer')
const sendUserEmail = (mailOptions) => {
    return new Promise((resolve, reject) => {
        let smtpConfig = {
            host: 'smtp.matizbcn.com',
            port: 578,
            secure: false, // upgrade later with STARTTLS
            auth: {
                user: process.env.MAIL,
                pass: process.env.PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        }
        let transporter = nodemailer.createTransport(smtpConfig);

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error)
            } else {
                resolve(info)
            }
        })
    })
}

module.exports = { sendUserEmail }
