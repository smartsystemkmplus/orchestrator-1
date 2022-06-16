const express = require('express')
const router = express.Router()
const authServiceRoute = require('./authServiceRoute.js')

router.use('/auth',authServiceRoute)

module.exports = router