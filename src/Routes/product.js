const express = require('express')
const router = express.Router()

const { create, productById, read } = require('../Controllers/ProductController')
const { requireSignin, isAuth, isAdmin } = require('../Controllers/AuthController')
const { userById } = require("../Controllers/UserController")

router.get('/product/:productId', read)
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create)

//Middware to userId route param
router.param('userId', userById)
router.param('productId', productById)

module.exports = router