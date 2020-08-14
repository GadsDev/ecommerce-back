const express = require('express')
const router = express.Router()

const { signup } = require('../Controllers/UserController')
const {userSignupValidator} = require('../Validators')
router.post('/signup', userSignupValidator,  signup)

module.exports = router