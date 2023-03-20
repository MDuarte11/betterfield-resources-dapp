const router = require('express').Router()
const { validator } = require('../../../validator')
const Controller = require('./controller')

/**
 * @swagger
 *
 *  /resources/delete-resource:
 *    post:
 *      description: Delete a resource
 *      tags:
 *        - resources
 *      produces:
 *        - application/json
 *      requestBody:
 *        description: "Resource"
 *        content: 
 *          application/json: 
 *            schema: 
 *              $ref: '#/components/schemas/DeleteResourceReqDto'
 *      responses:
 *        default:
 *          description: Resource deleted
 *          content:
 *            application/json: 
 *              schema:
 *                $ref: '#/components/schemas/DeleteResourceResDto'
 */
router.post(
  '/',
  validator.body(Controller.bodySchema),
  async function handler(req, res) {
    await Controller.handler(req, res, true)
  }
)

module.exports = router