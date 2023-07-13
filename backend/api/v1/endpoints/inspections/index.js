const router = require('express').Router()
const authenticateAPIKey = require('../../../../app/middleware/auth');

router.use('/add-inspection', authenticateAPIKey, require('./add-inspection'))
router.use('/update-inspection', authenticateAPIKey, require('./update-inspection'))
router.use('/delete-inspection', authenticateAPIKey, require('./delete-inspection'))
router.use('/get-inspection', require('./get-inspection'))
router.use('/get-inspections', require('./get-inspections'))

module.exports = router