export default {
    development: {
        username: process.env.DB_LOCAL_USER,
        password: process.env.DB_LOCAL_PASS,
        database: process.env.DB_LOCAL_NAME,
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
