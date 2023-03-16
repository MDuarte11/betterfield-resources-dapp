const router = require('express').Router()

router.use('/add-resource', require('./add-resource'))

module.exports = router