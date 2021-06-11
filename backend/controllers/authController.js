const asyncErrorHandler = require('../middlewares/asyncErrorHandler')
const User = require('../models/User')
const ErrorHandler = require('../utils/Errors')
const sendToken = require('../utils/jwtToken')
const sendResetPasswordEmail = require('../utils/sendResetPasswordEmail')
const crypto = require('crypto')

exports.registerUser = asyncErrorHandler(async (req, res, next) => {

    const { name, email, password, avator } = req.body
    console.log(req.body)
    const user = await User.create({
        name,
        email,
        password,
        avator: {
            public_id: "aaaaaaa",
            url: "bbbbbb"
        },

    })

    sendToken(user, 201, res)
})

exports.loginUser = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    const isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    sendToken(user, 200, res)
})

exports.logoutUser = asyncErrorHandler(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logout successfully'
    })
})

exports.forgotPassword = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new ErrorHandler('No user found with this email', 404))
    }

    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false })

    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset token is as follow: \n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`

    try {
        await sendResetPasswordEmail({
            email: user.email,
            subject: 'Shop password recover',
            message
        })

        res.status(200).json({
            success: true,
            message: 'Successfully send reset password token'
        })
    } catch (err) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save({ validateBeforeSave: false })

        return next(new ErrorHandler(err.message, 500))
    }

})

exports.resetPassword = asyncErrorHandler(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler('Invalid token or token is expired', 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password doesn\'t match', 401))
    }

    user.password = req.body.password

    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    sendToken(user, 200, res)

})

