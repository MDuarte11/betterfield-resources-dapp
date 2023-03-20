const { Joi } = require('../../../validator')
const UpdateResourceUseCase = require('../../../../../app/usecases/resources/update-resource')

const bodySchema = Joi.object({
    smartContractAddress: Joi.string().min(0).required(),
    resourceId: Joi.string().min(0).required(),
    resource: Joi.object({
        id: Joi.number().integer().min(0).required(),
        name: Joi.string().min(0).required(),
        type: Joi.object({
            id: Joi.number().integer().min(0).required(),
            name: Joi.string().min(0).required()
        })
    })
})

async function handler(req, res) {
  try {
    let resourceUpdated = await UpdateResourceUseCase.run(req.body.smartContractAddress, req.body.resourceId, req.body.resource)

    if (!resourceUpdated) {
      res.json({
        resourceUpdated: resourceUpdated
      }).status(400).send()
      return
    }

    res.json({
      resourceUpdated: resourceUpdated
    })
  } catch (err) {
    res.status(500).send()
  }
}

module.exports = {
  bodySchema,
  handler,
}