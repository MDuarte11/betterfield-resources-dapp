const { Joi } = require('../../../validator')
const AddInspectionUseCase = require('../../../../../app/usecases/inspections/add-inspection')
const UploadMediaUseCase = require('../../../../../app/usecases/uploads/upload-multiple-media')

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
    let inspection = req.body.inspection
    inspection.items = await Promise.all(inspection.items.map(async (item) => {
      if (item.mediaUrls) {
        let cids = await UploadMediaUseCase.run(inspection.name, item.name, item.mediaUrls)
        item.mediaCIDs = cids
      }
      return item
    }))

    let inspectionAdded = await AddInspectionUseCase.run(req.body.smartContractAddress, req.body.resourceId, req.body.inspectionId, inspection)

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
    console.log(err)
    res.status(500).send()
  }
}

module.exports = {
  bodySchema,
  handler,
}