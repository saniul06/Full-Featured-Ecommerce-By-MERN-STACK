const User = require('../models/User')

const jwt = require('jsonwebtoken')

const asyncErrorHandler = require('./asyncErrorHandler')

exports.isAuthenticated = asyncErrorHandler(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new Error('Login first to access the resource', 401))
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.user = User.findById(decode._id)

    // jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    //     if (err) {
    //         return next(new Error('Login first to access the resource', 401))
    //     }
    //     req.user = User.findById(decode._id)

    //     next()
    // })


    next()


})

