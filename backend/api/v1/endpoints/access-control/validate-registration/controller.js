const { Joi } = require('../../../validator')
const ValidateRegistrationUseCase = require('../../../../../app/usecases/access-control/validate-registration')

const bodySchema = Joi.object({
    smartContractAddress: Joi.string().min(0).required(),
    accountAddress: Joi.string().min(0).required()
})

async function handler(req, res) {
  try {
    let registrationValidated = await ValidateRegistrationUseCase.run(req.body.smartContractAddress, req.body.accountAddress)

    if (!registrationValidated) {
      res.json({
        registrationValidated: registrationValidated
      }).status(400).send()
      return
    }

    res.json({
        registrationValidated: registrationValidated
    })
  } catch (err) {
    res.status(500).send()
  }
}

module.exports = {
  bodySchema,
  handler,
}