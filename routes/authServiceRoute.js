const express = require('express')
const { AuthServiceController } = require('../controllers/authServiceController')
const router = express.Router()

router.post('/after-login',AuthServiceController.afterLogin)
router.post('/reset-password',AuthServiceController.resetPassword)

module.exports = router