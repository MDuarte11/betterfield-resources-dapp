const { Joi } = require('../../../validator')
const UpdateInspectionUseCase = require('../../../../../app/usecases/inspections/update-inspection')

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
            location: Joi.string().optional(),
            type: Joi.object({
                id: Joi.number().integer().min(0).required(),
                name: Joi.string().min(0).required()
            }),
            additionalData: Joi.string().optional()
        }),
        conformity: Joi.string().min(0).required(),
        items: Joi.array().items(Joi.object({
            id: Joi.number().integer().min(0).required(),
            name: Joi.string().min(0).required(),
            conformity: Joi.string().min(0).required(),
            description: Joi.string().optional(),
            mediaUrls: Joi.array().items(Joi.string()).optional(),
            mediaCID: Joi.string().optional(),
            additionalData: Joi.string().optional()
        })),
        additionalData: Joi.string().optional()
    })
})

async function handler(req, res) {
  try {
    let inspectionUpdated = await UpdateInspectionUseCase.run(req.body.smartContractAddress, req.body.resourceId, req.body.inspectionId, req.body.inspection)

    if (!inspectionUpdated) {
      res.json({
        inspectionUpdated: inspectionUpdated
      }).status(400).send()
      return
    }

    res.json({
        inspectionUpdated: inspectionUpdated
    })
  } catch (err) {
    console.log(err)
    res.status(500).send()
  }
}

module.exports = {
  bodySchema,
  handler,
}