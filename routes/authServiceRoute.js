const express = require('express')
const { AuthServiceController } = require('../controllers/authServiceController')
const router = express.Router()

router.post('/after-login',AuthServiceController.afterLogin)

module.exports = router