const router = require('express').Router()

/**
 * @swagger
 * 
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */

router.use('/access-control', require('./access-control'))
router.use('/resources', require('./resources'))
router.use('/inspections', require('./inspections'))

module.exports = router