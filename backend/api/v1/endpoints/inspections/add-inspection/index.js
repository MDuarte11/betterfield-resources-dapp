const router = require('express').Router()
const { validator } = require('../../../validator')
const Controller = require('./controller')

/**
 * @swagger
 *
 *  /inspections/add-inspection:
 *    post:
 *      description: Add an inspection
 *      tags:
 *        - inspections
 *      produces:
 *        - application/json
 *      requestBody:
 *        description: "Inspection"
 *        content: 
 *          application/json: 
 *            schema: 
 *              $ref: '#/components/schemas/AddInspectionReqDto'
 *      responses:
 *        default:
 *          description: Inspection added
 *          content:
 *            application/json: 
 *              schema:
 *                $ref: '#/components/schemas/AddInspectionResDto'
 */
router.post(
  '/',
  validator.body(Controller.bodySchema),
  async function handler(req, res) {
    await Controller.handler(req, res, true)
  }
)

module.exports = router