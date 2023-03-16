const router = require('express').Router()
const { validator } = require('../../../validator')
const Controller = require('./controller')

/**
 * @swagger
 *
 *  /access-control/validate-registration:
 *    post:
 *      description: Validate the registration of a queued user
 *      tags:
 *        - access-control
 *      produces:
 *        - application/json
 *      requestBody:
 *        description: "User Polygon wallet address"
 *        content: 
 *          application/json: 
 *            schema: 
 *              $ref: '#/components/schemas/ValidateRegistrationReqDto'
 *      responses:
 *        default:
 *          description: Registration validated
 *          content:
 *            application/json: 
 *              schema:
 *                $ref: '#/components/schemas/ValidateRegistrationResDto'
 */
router.post(
  '/',
  validator.body(Controller.bodySchema),
  async function handler(req, res) {
    await Controller.handler(req, res, true)
  }
)

module.exports = router