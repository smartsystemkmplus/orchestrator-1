const express = require('express')
const { UserServiceController } = require('../controllers/userServiceController')
const router = express.Router()

router.post('/',UserServiceController.addUser)
router.put('/',UserServiceController.updateUser)

router.post('/other/select-query',UserServiceController.selectQuery)

module.exports = router
