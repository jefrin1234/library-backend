const express = require('express')
const router = express.Router()

const {addUser} = require('../controllers/signupControllers')



router.post('/',addUser)

module.exports = router