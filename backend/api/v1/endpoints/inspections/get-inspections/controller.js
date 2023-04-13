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

    // Parse valid Json entries. Skip invalid entries, to prevent data loss send raw data as well.
    let decodedInspections = inspections[1].reduce((reducedInspections, inspection) => {
        try {
            reducedInspections.push(JSON.parse(inspection))
        } catch (err) {
            console.log(err)
            // Ignore error
        }
        return reducedInspections
    }, [])

    res.json({
        inspectionIds: inspections[0],
        inspections: decodedInspections,
        inspectionsRaw: inspections[1]
    })
  } catch (err) {
    res.status(500).send()
  }
}

module.exports = {
  bodySchema,
  handler,
}