const { Joi, Segments, celebrate } = require('celebrate')

function validate(segment, schema) {
  return celebrate({
    [segment]: schema
  })
}

const validator = {
  body: (schema) => validate(Segments.BODY, schema),
  query: (schema) => validate(Segments.QUERY, schema),
  params: (schema) => validate(Segments.PARAMS, schema),
}

module.exports = {
  validator,
  Joi
}