var log4js = require('log4js')
log4js.configure({
    appenders: {
        console: {
            type: 'console',
            layout: {
                type: 'pattern',
                pattern: '%[%d%]%[%5p%] %m',
            },
        },
        file: {
            type: 'file',
            filename: 'logs/combined.log',
            layout: {
                type: 'pattern',
                pattern: '[%d] [%p] %m',
            },
        },
    },
    categories: {
        default: {
            appenders: ['file', 'console'],
            level: 'DEBUG',
        },
    },
})
const logger = log4js.getLogger()

export default logger
