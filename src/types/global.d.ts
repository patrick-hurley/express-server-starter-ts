export {}

declare global {
    interface CustomError extends Error {
        status: number
        err: {
            stack: string
            message: string
        }
        details: string
    }
}
