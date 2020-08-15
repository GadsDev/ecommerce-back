const express = require('express')
const router = express.Router()

const { create } = require('../Controllers/ProductController')
const { requireSignin, isAuth, isAdmin } = require('../Controllers/AuthController')
const { userById } = require("../Controllers/UserController")

router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create)
//Middware to userId route param
router.param('userId', userById)

module.exports = router