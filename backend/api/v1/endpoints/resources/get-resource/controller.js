const { Joi } = require('../../../validator')
const GetResourceUseCase = require('../../../../../app/usecases/resources/get-resource')

const bodySchema = Joi.object({
    smartContractAddress: Joi.string().min(0).required(),
    resourceId: Joi.string().min(0).required()
})

async function handler(req, res) {
  try {
    let resource = await GetResourceUseCase.run(req.body.smartContractAddress, req.body.resourceId)

    if (!resource) {
      res.status(400).send()
      return
    }

    res.json({
        resource: resource
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