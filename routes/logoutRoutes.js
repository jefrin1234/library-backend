const express = require('express')
const router = express.Router()
const logout = require('../controllers/logoutControllers')
router.post('/',logout)

module.exports =  router