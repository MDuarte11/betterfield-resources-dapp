const router = require('express').Router()

router.use('/register', require('./register'))
router.use('/validate-registration', require('./validate-registration'))

module.exports = router