import express, { Response } from 'express'
const router = express.Router()
import logger from '../config/logger'

import FirstPolicy from '../policies/FirstPolicy'

/**
 * POST /v1/api/first-route
 * @summary My first route.
 * @tags ApiTag
 * @param {FirstPayload} request.body.required - log - application/json
 * @return 200 - Success response - application/json
 */
router.get('/', FirstPolicy.policy, (_, res: Response) => {
    logger.info('First api route')
    res.status(200).send({
        hello: 'world',
    })
})

export default router
