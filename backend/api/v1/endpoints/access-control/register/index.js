const router = require('express').Router()
const { validator } = require('../../../validator')
const Controller = require('./controller')

/**
 * @swagger
 *
 *  /access-control/register:
 *    post:
 *      description: Queue an user to be registered
 *      tags:
 *        - access-control
 *      produces:
 *        - application/json
 *      requestBody:
 *        description: "User Polygon wallet address"
 *        content: 
 *          application/json: 
 *            schema: 
 *              $ref: '#/components/schemas/RegisterReqDto'
 *            example:
 *              address: '0x3E572A3E08A1d5f622518b88dbE39473cF753c51'
 *      responses:
 *        default:
 *          description: registration
 *          content:
 *            application/json: 
 *              schema:
 *                $ref: '#/components/schemas/RegisterResDto'
 */
router.post(
  '/',
  validator.body(Controller.bodySchema),
  async function handler(req, res) {
    await Controller.handler(req, res, true)
  }
)

module.exports = router