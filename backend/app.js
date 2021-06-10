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
const user = require('./routes/userRoutes')

app.use('/api/v1', products, user)

//handle errors
app.use(errorMiddleware)

module.exports = app

