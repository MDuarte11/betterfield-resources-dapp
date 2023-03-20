const router = require('express').Router()

router.use('/add-resource', require('./add-resource'))
router.use('/get-resource', require('./get-resource'))
router.use('/update-resource', require('./update-resource'))
router.use('/delete-resource', require('./delete-resource'))

module.exports = router