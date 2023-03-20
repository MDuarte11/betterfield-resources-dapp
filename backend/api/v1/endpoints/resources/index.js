const router = require('express').Router()

router.use('/add-resource', require('./add-resource'))
router.use('/get-resource', require('./get-resource'))

module.exports = router