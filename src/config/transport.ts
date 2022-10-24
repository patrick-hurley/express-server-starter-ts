// Email configuration

const nodemailer = require('nodemailer')

const options = {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
}

let transport = nodemailer.createTransport(options)

export default transport
