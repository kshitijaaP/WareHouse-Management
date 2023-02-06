'use strict'

const router = require('express').Router()
const cors = require("cors");
router.use(cors())

const {
    postLogin,

    getLogin,
    
} = require('../controllers/login_controller')

router.route('/login')


.get(getLogin)
.post(postLogin)

module.exports = router
 