const router = require('express').Router()
const { validator } = require('../../../validator')
const Controller = require('./controller')

/**
 * @swagger
 *
 *  /access-control/unregister:
 *    post:
 *      description: Unregister an user
 *      tags:
 *        - access-control
 *      produces:
 *        - application/json
 *      requestBody:
 *        description: "User Polygon wallet address"
 *        content: 
 *          application/json: 
 *            schema: 
 *              $ref: '#/components/schemas/UnregisterReqDto'
 *      responses:
 *        default:
 *          description: Unregistration
 *          content:
 *            application/json: 
 *              schema:
 *                $ref: '#/components/schemas/UnregisterResDto'
 */
router.post(
  '/',
  validator.body(Controller.bodySchema),
  async function handler(req, res) {
    await Controller.handler(req, res, true)
  }
)

module.exports = router