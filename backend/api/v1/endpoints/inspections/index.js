const router = require('express').Router()

router.use('/add-inspection', require('./add-inspection'))

module.exports = router