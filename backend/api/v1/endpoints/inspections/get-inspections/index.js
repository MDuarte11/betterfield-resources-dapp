const router = require('express').Router()
const { validator } = require('../../../validator')
const Controller = require('./controller')

/**
 * @swagger
 *
 *  /inspections/get-inspections:
 *    post:
 *      description: Get multiple inspections
 *      tags:
 *        - inspections
 *      produces:
 *        - application/json
 *      requestBody:
 *        description: "Inspection"
 *        content: 
 *          application/json: 
 *            schema: 
 *              $ref: '#/components/schemas/GetInspectionsReqDto'
 *      responses:
 *        default:
 *          description: Inspections retrieved
 *          content:
 *            application/json: 
 *              schema:
 *                $ref: '#/components/schemas/GetInspectionsResDto'
 */
router.post(
  '/',
  validator.body(Controller.bodySchema),
  async function handler(req, res) {
    await Controller.handler(req, res, true)
  }
)

module.exports = router