const { Joi } = require('../../../validator')
const DeleteInspectionUseCase = require('../../../../../app/usecases/inspections/delete-inspection')

const bodySchema = Joi.object({
    smartContractAddress: Joi.string().min(0).required(),
    resourceId: Joi.string().min(0).required(),
    inspectionId: Joi.string().min(0).required()
})

async function handler(req, res) {
  try {
    let inspectionDeleted = await DeleteInspectionUseCase.run(req.body.smartContractAddress, req.body.resourceId, req.body.inspectionId)

    if (!inspectionDeleted) {
      res.json({
        inspectionDeleted: inspectionDeleted
      }).status(400).send()
      return
    }

    res.json({
        inspectionDeleted: inspectionDeleted
    })
  } catch (err) {
    res.status(500).send()
  }
}

module.exports = {
  bodySchema,
  handler,
}