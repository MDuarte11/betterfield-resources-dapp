const router = require('express').Router()
const { validator } = require('../../../validator')
const Controller = require('./controller')

/**
 * @swagger
 *
 *  /resources/update-resource:
 *    post:
 *      description: Update a resource
 *      tags:
 *        - resources
 *      produces:
 *        - application/json
 *      requestBody:
 *        description: "Resource"
 *        content: 
 *          application/json: 
 *            schema: 
 *              $ref: '#/components/schemas/UpdateResourceReqDto'
 *      responses:
 *        default:
 *          description: Resource updated
 *          content:
 *            application/json: 
 *              schema:
 *                $ref: '#/components/schemas/UpdateResourceResDto'
 */
router.post(
  '/',
  validator.body(Controller.bodySchema),
  async function handler(req, res) {
    await Controller.handler(req, res, true)
  }
)

module.exports = router