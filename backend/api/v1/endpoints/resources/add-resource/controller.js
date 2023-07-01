const { Joi } = require('../../../validator')
const AddResourceUseCase = require('../../../../../app/usecases/resources/add-resource')

const bodySchema = Joi.object({
    smartContractAddress: Joi.string().min(0).required(),
    resourceId: Joi.string().min(0).required(),
    resource: Joi.object({
        id: Joi.number().integer().min(0).required(),
        name: Joi.string().min(0).required(),
        location: Joi.string().optional(),
        type: Joi.object({
            id: Joi.number().integer().min(0).required(),
            name: Joi.string().min(0).required()
        }),
        additionalData: Joi.string().optional()
    })
})

async function handler(req, res) {
  try {
    let resourceAdded = await AddResourceUseCase.run(req.body.smartContractAddress, req.body.resourceId, req.body.resource)

    if (!resourceAdded) {
      res.json({
        resourceAdded: resourceAdded
      }).status(400).send()
      return
    }

    res.json({
        resourceAdded: resourceAdded
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