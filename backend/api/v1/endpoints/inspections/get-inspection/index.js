const router = require('express').Router()
const { validator } = require('../../../validator')
const Controller = require('./controller')

/**
 * @swagger
 *
 *  /inspections/get-inspection:
 *    post:
 *      description: Get an inspection
 *      tags:
 *        - inspections
 *      produces:
 *        - application/json
 *      requestBody:
 *        description: "Inspection"
 *        content: 
 *          application/json: 
 *            schema: 
 *              $ref: '#/components/schemas/GetInspectionReqDto'
 *      responses:
 *        default:
 *          description: Inspection retrieved
 *          content:
 *            application/json: 
 *              schema:
 *                $ref: '#/components/schemas/GetInspectionResDto'
 */
router.post(
  '/',
  validator.body(Controller.bodySchema),
  async function handler(req, res) {
    await Controller.handler(req, res, true)
  }
)

module.exports = router