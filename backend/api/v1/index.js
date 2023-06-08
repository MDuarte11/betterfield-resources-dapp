const bodyParser = require('body-parser')
const cors = require('cors')
const errorHandler = require('./errors/handler')
const { errors } = require('celebrate')

const router = require('express').Router()

router.use(bodyParser.json())

// allow cors requests from any origin
router.use(cors({
  origin: '*',
  allowedHeaders: ['Content-Type', 'X-Amz-Date', 'X-Api-Key', 'X-Amz-Security-Token', 'X-Amz-User-Agent']
}))

// api routes
router.use('/', require('./endpoints'))

// global error handler
router.use(errors({ statusCode: 400 }))
router.use(errorHandler)

module.exports = router