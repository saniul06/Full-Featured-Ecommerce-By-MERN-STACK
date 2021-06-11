const router = require('express').Router()
const { isAuthenticated, authorizeRoles } = require('../middlewares/auth')
const { getUserProfile, updatePassword, updateProfile } = require('../controllers/userController')

router.route('/me').get(isAuthenticated, getUserProfile)

router.route('/me/update').put(isAuthenticated, updateProfile)

router.route('/me/password/update').put(isAuthenticated, updatePassword)

module.exports = router