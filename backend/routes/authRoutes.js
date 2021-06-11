const router = require('express').Router()

const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword } = require('../controllers/authController')

router.route('/register').post(registerUser)

router.route('/login').post(loginUser)

router.route('/logout').post(logoutUser)

router.route('/password/forgot').post(forgotPassword)

router.route('/password/reset/:token').post(resetPassword)

module.exports = router

