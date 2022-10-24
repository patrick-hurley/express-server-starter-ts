// Express
import express, { Response, Request, NextFunction } from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'

// Enable dotenv
import dotenv from 'dotenv'
dotenv.config()

import db from './models'

import path from 'path'
import history from 'connect-history-api-fallback'
import frameguard from 'frameguard'

// Swagger
import expressJSDocSwagger from 'express-jsdoc-swagger'
import swaggerOptions from './config/swaggerOptions'

// Logging
import logger from './config/logger'

import prettyerror from 'pretty-error'
prettyerror.start()

import colors from 'colors'
colors.enable()

/* 
-------------------------------
Express setup
-------------------------------
*/
const app = express()

app.use(bodyParser.json())

app.use(cookieParser())

app.use(cors())

/* Clickjacking prevention */
app.use(function (req, res, next) {
    res.header('Content-Security-Policy', "frame-ancestors 'none'")

    next()
})
app.use(frameguard({ action: 'deny' }))

// http logging
if (process.env.HOSTING_ENV !== 'development') {
    app.use(morgan('combined'))
} else {
    const morganChalk = morgan(function (tokens, req, res) {
        return [
            tokens.method(req, res),
            tokens.status(req, res),
            tokens.url(req, res),
            tokens['response-time'](req, res) + ' ms',
        ].join(' ').gray
    })
    app.use(morganChalk)
}

/* 
-------------------------------
Swagger
-------------------------------
*/

if (process.env.HOSTING_ENV === 'development') {
    expressJSDocSwagger(app)(swaggerOptions)
}

/* 
-------------------------------
Routes
-------------------------------
*/
import routes from './routes'
app.use('/v1/api/', routes)

/*
-------------------------------
Production settings
-------------------------------
*/
if (process.env.HOSTING_ENV !== 'development') {
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https') {
            res.redirect(`https://${req.header('host')}${req.url}`)
        } else {
            next()
        }
    })
    app.use(history())
    app.use(express.static(path.join(__dirname, '../../client/dist')))
}

/*
-------------------------------
Error handler
-------------------------------
*/
app.use(
    async (
        error: CustomError,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const errorPayload = {
            status: error.status,
            url: req.url,
            message: error.message,
            stack: error.err ? error.err.stack : null,
            stackMessage: error.err ? error.err.message : null,
        }

        logger.error(errorPayload)

        if (!res.headersSent) {
            res.status(500).send({
                error: error.message,
            })
        }

        return next()
    }
)

process.on('warning', (e) => logger.warn(e.stack))

/*
-------------------------------
Start server
-------------------------------
*/
db.sequelize
    .sync()
    .then(() => {
        app.listen(process.env.PORT, async () => {
            console.log(
                '\n\n🐠 ' + `Server started on port: ${process.env.PORT}`.bold
            )
            console.log('🌵 ' + `Environment: ${process.env.HOSTING_ENV}`.bold)
            console.log(
                '📪 ' +
                    `Email sending: ${
                        parseInt(process.env.SEND_EMAIL) ? 'on' : 'off'
                    }\n\n`.bold
            )
        })
    })
    .catch((err: Error) => {
        console.log(err)
    })
