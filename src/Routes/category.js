const express = require('express')
const router = express.Router()

const { create, categoryById, read, update, remove, list} = require('../Controllers/CategoryController')
const { requireSignin, isAuth, isAdmin } = require('../Controllers/AuthController')
const { userById } = require("../Controllers/UserController")

router.get('/category', list)
router.get('/category/:categoryId', read)
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create)
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, update)
router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, remove)

//Middware to userId route param
router.param('userId', userById)
router.param('categoryId', categoryById)

module.exports = router