const express = require('express')

const morgan = require('morgan');

const cookieParser = require('cookie-parser')

const fileUpload = require('express-fileupload')

const errorMiddleware = require('./middlewares/errorHandler');

const app = express()

app.use(morgan('dev'));

app.use(express.json())

app.use(cookieParser())

app.use(express.urlencoded({ extended: true }));

app.use(fileUpload())

//import routes
const products = require('./routes/productRoutes')
const auth = require('./routes/authRoutes')
const user = require('./routes/userRoutes')
const admin = require('./routes/adminRoutes')
const order = require('./routes/orderRoutes')

app.use('/api/v1', products, auth, user, admin, order)

//handle errors
app.use(errorMiddleware)

module.exports = app

