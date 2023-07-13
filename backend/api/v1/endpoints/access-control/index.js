const router = require('express').Router()
const authenticateAPIKey = require('../../../../app/middleware/auth');

router.use('/register', require('./register'))
router.use('/validate-registration', authenticateAPIKey, require('./validate-registration'))
router.use('/unregister', authenticateAPIKey, require('./unregister'))

module.exports = router