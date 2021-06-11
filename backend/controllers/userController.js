const asyncErrorHandler = require('../middlewares/asyncErrorHandler')
const User = require('../models/User')
const ErrorHandler = require('../utils/Errors')
const sendToken = require('../utils/jwtToken')

exports.getUserProfile = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id)

    res.status(200).json({
        success: true,
        user
    })
})

exports.updatePassword = asyncErrorHandler(async (req, res, next) => {

    const { oldPassword, password, confirmPassword } = req.body

    if (!oldPassword || !password || !confirmPassword) {
        return next(new ErrorHandler('Please give password', 400))
    }

    const user = await User.findById(req.user._id).select('+password')

    const isPasswordMatched = await user.comparePassword(oldPassword)

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Old password do not match', 400))
    }

    if (password !== confirmPassword) {
        return next(new ErrorHandler('New password do not match', 400))
    }

    user.password = password
    await user.save()
    sendToken(user, 200, res)

})

exports.updateProfile = asyncErrorHandler(async (req, res, next) => {
    const updatedUserData = {
        name: req.body.name,
        email: req.body.email
    }

    // TODO: add avator for user

    const user = await User.findByIdAndUpdate(req.user._id, updatedUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
})