const router = require('express').Router()

router.use('/add-inspection', require('./add-inspection'))
router.use('/update-inspection', require('./update-inspection'))
router.use('/delete-inspection', require('./delete-inspection'))
router.use('/get-inspection', require('./get-inspection'))

module.exports = router