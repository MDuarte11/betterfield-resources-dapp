const { Joi } = require('../../../validator')
const GetResourcesUseCase = require('../../../../../app/usecases/resources/get-resources')

const bodySchema = Joi.object({
    smartContractAddress: Joi.string().min(0).required(),
    lastId: Joi.string().min(0).required(),
    pageSize: Joi.string().min(0).required()
})

async function handler(req, res) {
  try {
    let resources = await GetResourcesUseCase.run(req.body.smartContractAddress, req.body.lastId, req.body.pageSize)

    if (!resources) {
      res.status(400).send()
      return
    }

    res.json({
        resourceIds: resources[0],
        resources: resources[1]
    })
  } catch (err) {
    res.status(500).send()
  }
}

module.exports = {
  bodySchema,
  handler,
}