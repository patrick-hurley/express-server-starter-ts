import logger from '../config/logger'
import transport from '../config/transport'
import ServerErrorEmail from '../email-templates/serverError'
import { Response } from 'express'

export default {
    reject: function (error: any, res: Response, stack = null, httpCode = 400) {
        let message

        if (Array.isArray(error.details)) {
            message = error.details.map((error: any) => {
                return error.message
            })
        } else {
            message = error
        }

        if (stack) {
            logger.error(stack)
        } else {
            logger.info(error)
        }

        res.status(httpCode).send({
            error: message,
        })
    },
    notify: async function (error: string) {
        if (parseInt(process.env.SEND_EMAIL)) {
            const message = {
                from: 'Webmaster <hello@webmaster.com>',
                to: process.env.ADMIN_EMAIL,
                subject: 'Server error notification.',
                html: ServerErrorEmail(error),
            }
            await transport.sendMail(message)
        }
    },
}
