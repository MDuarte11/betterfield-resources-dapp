const router = require('express').Router()
const authenticateAPIKey = require('../../../../app/middleware/auth');

router.use('/add-resource', authenticateAPIKey, require('./add-resource'))
router.use('/get-resource', require('./get-resource'))
router.use('/get-resources', require('./get-resources'))
router.use('/update-resource', authenticateAPIKey, require('./update-resource'))
router.use('/delete-resource', authenticateAPIKey, require('./delete-resource'))

module.exports = router