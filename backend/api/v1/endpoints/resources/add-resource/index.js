const router = require('express').Router()
const { validator } = require('../../../validator')
const Controller = require('./controller')

/**
 * @swagger
 *
 *  /resources/add-resource:
 *    post:
 *      description: Add a resource
 *      tags:
 *        - resources
 *      produces:
 *        - application/json
 *      requestBody:
 *        description: "Resource"
 *        content: 
 *          application/json: 
 *            schema: 
 *              $ref: '#/components/schemas/AddResourceReqDto'
 *      responses:
 *        default:
 *          description: Resource added
 *          content:
 *            application/json: 
 *              schema:
 *                $ref: '#/components/schemas/AddResourceResDto'
 */
router.post(
  '/',
  validator.body(Controller.bodySchema),
  async function handler(req, res) {
    await Controller.handler(req, res, true)
  }
)

module.exports = router