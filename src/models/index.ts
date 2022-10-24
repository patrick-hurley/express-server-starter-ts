import fs from 'fs'
import path from 'path'
const Sequelize = require('sequelize')
const env = process.env.NODE_ENV
import con from '../config/config'
const config: any = con[env]
const db: any = {}

import colors from 'sequelize-log-syntax-colors'
config.logging = colors

let sequelize: any

if (env !== 'development') {
    sequelize = new Sequelize(config.database, {
        dialect: config.dialect,
        host: config.host,
        logging: false,
    })
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        {
            host: config.host,
            dialect: config.dialect,
            logging: false,
        }
    )
}

// read all model files in the current directory and sets them up with sequelize (other than index.js)
fs.readdirSync(__dirname)
    .filter((file) => file !== 'index.js')
    // load the models into sequelize
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        )
        db[model.name] = model
    })

// Sequelize
db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
