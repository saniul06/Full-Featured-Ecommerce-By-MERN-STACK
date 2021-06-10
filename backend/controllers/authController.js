const asyncErrorHandler = require('../middlewares/asyncErrorHandler')
const User = require('../models/User')
const ErrorHandler = require('../utils/Errors')
const sendToken = require('../utils/jwtToken')

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