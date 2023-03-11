const serverless = require('serverless-http')
const express = require('express')
const morgan = require('morgan')
const expressApp = express()

// Bootstrap application and its api
const app = require('./app')
const onAppReady = app.start()
const api = require('./api')

expressApp.use(morgan('tiny'))

expressApp.use('/', api)

expressApp.set('view engine', 'ejs')

module.exports.handler = serverless(expressApp, {
  basePath: '/api'
})

module.exports.getExpressApp = async () => {
  await onAppReady
  return expressApp
}