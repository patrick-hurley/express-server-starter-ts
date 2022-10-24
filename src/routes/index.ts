import express from 'express'
const router = express.Router()
import FirstRoute from './FirstRoute'

router.use('/first-route', FirstRoute)

export default router
