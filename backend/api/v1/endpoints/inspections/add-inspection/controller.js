const { Joi } = require('../../../validator')
const AddInspectionUseCase = require('../../../../../app/usecases/inspections/add-inspection')

const bodySchema = Joi.object({
    smartContractAddress: Joi.string().min(0).required(),
    resourceId: Joi.string().min(0).required(),
    inspectionId: Joi.string().min(0).required(),
    inspection: Joi.object({
        id: Joi.number().integer().min(0).required(),
        name: Joi.string().min(0).required(),
        resource: Joi.object({
            id: Joi.number().integer().min(0).required(),
            name: Joi.string().min(0).required(),
            type: Joi.object({
                id: Joi.number().integer().min(0).required(),
                name: Joi.string().min(0).required()
            })
        }),
        conformity: Joi.string().min(0).required(),
        items: Joi.array().items(Joi.object({
            id: Joi.number().integer().min(0).required(),
            name: Joi.string().min(0).required(),
            conformity: Joi.string().min(0).required(),
            description: Joi.string().optional(),
            mediaUrls: Joi.array().items(Joi.string()).optional()
        }))
    })
})

async function handler(req, res) {
  try {
    let inspectionAdded = await AddInspectionUseCase.run(req.body.smartContractAddress, req.body.resourceId, req.body.inspectionId, req.body.inspection)

    if (!inspectionAdded) {
      res.json({
        inspectionAdded: inspectionAdded
      }).status(400).send()
      return
    }

    res.json({
        inspectionAdded: inspectionAdded
    })
  } catch (err) {
    res.status(500).send()
  }
}

module.exports = {
  bodySchema,
  handler,
}