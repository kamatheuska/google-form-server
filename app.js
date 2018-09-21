const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()
const { sendUserEmail } = require('./email/index.js')
const dist = path.join(__dirname, 'dist/')

app.use(express.static(dist))
app.use(bodyParser.json())
app.use(morgan('dev'))

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    console.log(req.header('x-forwarded-proto'))
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`)
    }
    else {
      next()
    }
  })
}

app.get('/', (req, res) => {
  res.sendFile(dist + 'index.html')
})

app.post('/email', (req, res) => {
    let { name, email, text } = req.body
    // setup email data with unicode symbols
    let mailOptions = {
        from: `${ name } <${ email }>`, // sender address
        to: 'nico9017@gmail.com', // list of receivers
        subject: 'Product info', // Subject line
        text: `${ text }` // plain text body
    }
    sendUserEmail(mailOptions)
        .then((data) => {
            console.log('---->>  <PASS></PASS>...\n', data)
            res.status(200).send(data)
        })
        .catch((error) => {
            console.log('---->>  logging...\n', error)
            res.status(401).send(error)
        })
})

module.exports = app
