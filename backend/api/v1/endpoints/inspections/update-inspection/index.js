const router = require('express').Router()
const { validator } = require('../../../validator')
const Controller = require('./controller')

/**
 * @swagger
 *
 *  /inspections/update-inspection:
 *    post:
 *      description: Update an inspection
 *      tags:
 *        - inspections
 *      produces:
 *        - application/json
 *      requestBody:
 *        description: "Inspection"
 *        content: 
 *          application/json: 
 *            schema: 
 *              $ref: '#/components/schemas/UpdateInspectionReqDto'
 *      responses:
 *        default:
 *          description: Inspection updated
 *          content:
 *            application/json: 
 *              schema:
 *                $ref: '#/components/schemas/UpdateInspectionResDto'
 */
router.post(
  '/',
  validator.body(Controller.bodySchema),
  async function handler(req, res) {
    await Controller.handler(req, res, true)
  }
)

module.exports = router