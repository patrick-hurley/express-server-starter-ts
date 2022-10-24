export default {
    development: {
        username: 'username',
        password: 'password',
        database: 'database_name',
        host: 'localhost',
        dialect: 'postgres',
    },
    staging: {
        database: process.env.DATABASE_URL,
        host: process.env.HOST,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
        use_env_variable: 'DATABASE_URL',
    },
    production: {
        database: process.env.DATABASE_URL,
        host: process.env.HOST,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
        use_env_variable: 'DATABASE_URL',
    },
}
