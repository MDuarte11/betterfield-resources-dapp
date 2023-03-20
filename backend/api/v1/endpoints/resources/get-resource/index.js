const router = require('express').Router()
const { validator } = require('../../../validator')
const Controller = require('./controller')

/**
 * @swagger
 *
 *  /resources/get-resource:
 *    post:
 *      description: Get a resource
 *      tags:
 *        - resources
 *      produces:
 *        - application/json
 *      requestBody:
 *        description: "Resource"
 *        content: 
 *          application/json: 
 *            schema: 
 *              $ref: '#/components/schemas/GetResourceReqDto'
 *      responses:
 *        default:
 *          description: Resource retrieved
 *          content:
 *            application/json: 
 *              schema:
 *                $ref: '#/components/schemas/GetResourceResDto'
 */
router.post(
  '/',
  validator.body(Controller.bodySchema),
  async function handler(req, res) {
    await Controller.handler(req, res, true)
  }
)

module.exports = router