const { Joi } = require('../../../validator')
const UnregisterUseCase = require('../../../../../app/usecases/access-control/unregister')

const bodySchema = Joi.object({
    smartContractAddress: Joi.string().min(0).required(),
    accountAddress: Joi.string().min(0).required()
})

async function handler(req, res) {
  try {
    let unregistered = await UnregisterUseCase.run(req.body.smartContractAddress, req.body.accountAddress)

    if (!unregistered) {
      res.json({
        unregistered: unregistered
      }).status(400).send()
      return
    }

    res.json({
        unregistered: unregistered
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