declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ADMIN_EMAIL: string
            DOMAIN: string
            HOSTING_ENV: 'development' | 'staging' | 'production'
            NODE_ENV: 'development' | 'staging' | 'production'
            PORT: string
            SEND_EMAIL: string
            EMAIL_HOST: string
            EMAIL_PASS: string
            EMAIL_PORT: string
            EMAIL_USER: string
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
