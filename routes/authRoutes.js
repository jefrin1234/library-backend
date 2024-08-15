const express = require('express')
const { checkLogin } = require('../middleWare/checkLogin')
const { veriyLogin } = require('../controllers/loginControllers')
const router = express.Router()

router.get('/',checkLogin,veriyLogin)

module.exports = router