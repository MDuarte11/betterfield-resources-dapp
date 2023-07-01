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

    // Parse valid Json entries. Skip invalid entries, to prevent data loss send raw data as well.
    var reduceIndex = 0
    let decodedResources = resources[1].reduce((reducedResources, resource) => {
      try {
        reducedResources.push({
          id: resources[0][reduceIndex],
          resource: JSON.parse(resource)
        })
      } catch (err) {
        console.log(err)
        // Ignore error
      }
      reduceIndex++
      return reducedResources
    }, [])

    let lastResourceId = ""
    if(resources[0].length > 0) {
      lastResourceId = resources[0][resources[0].length - 1]
    }

    res.json({
        resourceIds: resources[0],
        resources: decodedResources,
        resourcesRaw: resources[1].map((resource, index) => {return {id: resources[0][index], resource}}),
        resourcesCount: resources[2].toNumber(),
        lastResourceId
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