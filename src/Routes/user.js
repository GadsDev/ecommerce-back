const express = require('express')
const router = express.Router()

const { requireSignin, isAuth, isAdmin } = require('../Controllers/AuthController')
const { userById, read, update } = require("../Controllers/UserController")
const { route } = require('./product')

router.get('/secret/:userId', requireSignin, isAuth, (req, res) => {
    res.json({
        user: req.profile
    })
})

router.get('/user/:userId', requireSignin, isAuth, read)
router.put('/user/:userId', requireSignin, isAuth, update)

//Middware to userId route param
router.param('userId', userById)

module.exports = router