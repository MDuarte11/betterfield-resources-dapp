const router = require('express').Router()

router.use('/add-inspection', require('./add-inspection'))
router.use('/update-inspection', require('./update-inspection'))

module.exports = router