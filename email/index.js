'use strict'
const nodemailer = require('nodemailer')
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
const sendUserEmail = (mailOptions) => {
    return new Promise((resolve, reject) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.com',
            port: 587,
            secure: false, // true for 465, false for other ports
        })
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error)
            } else {
            // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
                resolve(info.messageId)

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            }
        })
    })
}

/* 'use strict'
const nodemailer = require('nodemailer')

const sendUserEmail = (mailOptions) => {
  console.log('logging...', mailOptions)

  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD
    }
  })
  transporter.sendMail(mailOptions)
}
 */
module.exports = { sendUserEmail }
