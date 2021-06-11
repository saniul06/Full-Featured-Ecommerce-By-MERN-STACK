const express = require('express')

const morgan = require('morgan');

const cookieParser = require('cookie-parser')

const errorMiddleware = require('./middlewares/errorHandler');

const app = express()

app.use(morgan('dev'));

app.use(express.json())

app.use(cookieParser())

//import routes
const products = require('./routes/productRoutes')
const auth = require('./routes/authRoutes')

app.use('/api/v1', products, auth)

//handle errors
app.use(errorMiddleware)

module.exports = app

