const router = require('express').Router()
const { validator } = require('../../../validator')
const Controller = require('./controller')

/**
 * @swagger
 *
 *  /inspections/delete-inspection:
 *    post:
 *      description: Delete an inspection
 *      tags:
 *        - inspections
 *      produces:
 *        - application/json
 *      requestBody:
 *        description: "Inspection"
 *        content: 
 *          application/json: 
 *            schema: 
 *              $ref: '#/components/schemas/DeleteInspectionReqDto'
 *      responses:
 *        default:
 *          description: Inspection deleted
 *          content:
 *            application/json: 
 *              schema:
 *                $ref: '#/components/schemas/DeleteInspectionResDto'
 */
router.post(
  '/',
  validator.body(Controller.bodySchema),
  async function handler(req, res) {
    await Controller.handler(req, res, true)
  }
)

module.exports = router