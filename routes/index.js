const express = require('express')
const router = express.Router()
const userRoute = require('./authServiceRoute.js')

router.use('/auth',userRoute)

module.exports = router