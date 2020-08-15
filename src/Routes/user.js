const express = require('express')
const router = express.Router()

const { signup, signin, signout, requireSignin } = require('../Controllers/UserController')
const { userSignupValidator } = require('../Validators')

router.post('/signup', userSignupValidator, signup)
router.post('/signin', signin)
router.get('/signout', signout)

router.get('/hello', requireSignin, (req, res) => {
    res.send("Hello World!!")
})

module.exports = router