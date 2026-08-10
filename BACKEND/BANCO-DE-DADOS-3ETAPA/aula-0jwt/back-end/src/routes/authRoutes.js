const express = require('express')
const router = express.Router()
const authCrontroller = require()

router.post('/register', authCrontroller.register)
router.post('/login', authCrontroller.login)


module.exports = router