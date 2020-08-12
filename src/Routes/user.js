const express = require('express')
const router = express.Router()

const {
    sayHi
} = require('../Controllers/UserController')
router.get('/', sayHi)

module.exports = router