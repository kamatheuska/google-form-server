'use strict'
const nodemailer = require('nodemailer')
const sendUserEmail = (mailOptions) => {
    return new Promise((resolve, reject) => {
        // let transporter = nodemailer.createTransport({
        //     host: 'smtp.ethereal.com',
        //     port: 587,
        //     secure: false, // true for 465, false for other ports
        // })
        // // send mail with defined transport object
        nodemailer.createTransport({
            sendmail: true,
            newline: 'unix',
            path: '/usr/sbin/sendmail'
        });

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error)
            } else {
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
                resolve(info.messageId)
            }
        })
    })
}

module.exports = { sendUserEmail }
