const express = require('express')
const router = express.Router()

const { requireSignin } = require('../Controllers/AuthController')
const {
    userById
} = require("../Controllers/UserController")

router.get('/secret/:userId', requireSignin, (req, res) => {
    res.json({
        user: req.profile
    })
})

//Middware to userId route param
router.param('userId', userById)

module.exports = router