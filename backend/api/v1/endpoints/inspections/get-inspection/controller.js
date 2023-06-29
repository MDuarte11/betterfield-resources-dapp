const { Joi } = require('../../../validator')
const GetInspectionUseCase = require('../../../../../app/usecases/inspections/get-inspection')

const bodySchema = Joi.object({
    smartContractAddress: Joi.string().min(0).required(),
    resourceId: Joi.string().min(0).required(),
    inspectionId: Joi.string().min(0).required()
})

async function handler(req, res) {
  try {
    let inspection = await GetInspectionUseCase.run(req.body.smartContractAddress, req.body.resourceId, req.body.inspectionId)

    if (!inspection) {
      res.status(400).send()
      return
    }

    res.json({
        inspection: inspection
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