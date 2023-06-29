const { Joi } = require('../../../validator')
const RegisterUseCase = require('../../../../../app/usecases/access-control/register')

const bodySchema = Joi.object({
    smartContractAddress: Joi.string().min(0).required(),
    accountAddress: Joi.string().min(0).required()
})

async function handler(req, res) {
  try {
    let queuedForRegistration = await RegisterUseCase.run(req.body.smartContractAddress, req.body.accountAddress)

    if (!queuedForRegistration) {
      res.json({
        queuedForRegistration: queuedForRegistration
      }).status(400).send()
      return
    }

    res.json({
      queuedForRegistration: queuedForRegistration
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