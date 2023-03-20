const { Joi } = require('../../../validator')
const DeleteResourceUseCase = require('../../../../../app/usecases/resources/delete-resource')

const bodySchema = Joi.object({
    smartContractAddress: Joi.string().min(0).required(),
    resourceId: Joi.string().min(0).required()
})

async function handler(req, res) {
  try {
    let resourceDeleted = await DeleteResourceUseCase.run(req.body.smartContractAddress, req.body.resourceId)

    if (!resourceDeleted) {
      res.json({
        resourceDeleted: resourceDeleted
      }).status(400).send()
      return
    }

    res.json({
        resourceDeleted: resourceDeleted
    })
  } catch (err) {
    res.status(500).send()
  }
}

module.exports = {
  bodySchema,
  handler,
}