const router = require('express').Router()
const { validator } = require('../../../validator')
const Controller = require('./controller')

/**
 * @swagger
 *
 *  /resources/get-resources:
 *    post:
 *      description: Get multiple resources
 *      tags:
 *        - resources
 *      produces:
 *        - application/json
 *      requestBody:
 *        description: "Resource"
 *        content: 
 *          application/json: 
 *            schema: 
 *              $ref: '#/components/schemas/GetResourcesReqDto'
 *      responses:
 *        default:
 *          description: Resources retrieved
 *          content:
 *            application/json: 
 *              schema:
 *                $ref: '#/components/schemas/GetResourcesResDto'
 */
router.post(
  '/',
  validator.body(Controller.bodySchema),
  async function handler(req, res) {
    await Controller.handler(req, res, true)
  }
)

module.exports = router