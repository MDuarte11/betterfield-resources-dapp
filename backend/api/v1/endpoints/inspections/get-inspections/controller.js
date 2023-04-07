const { Joi } = require('../../../validator')
const GetInspectionsUseCase = require('../../../../../app/usecases/inspections/get-inspections')

const bodySchema = Joi.object({
    smartContractAddress: Joi.string().min(0).required(),
    resourceId: Joi.string().min(0).required(),
    lastId: Joi.string().min(0).required(),
    pageSize: Joi.string().min(0).required()
})

async function handler(req, res) {
  try {
    let inspections = await GetInspectionsUseCase.run(req.body.smartContractAddress, req.body.resourceId, req.body.lastId, req.body.pageSize)

    if (!inspections) {
      res.status(400).send()
      return
    }

    res.json({
        inspectionIds: inspections[0],
        inspections: inspections[1]
    })
  } catch (err) {
    res.status(500).send()
  }
}

module.exports = {
  bodySchema,
  handler,
}