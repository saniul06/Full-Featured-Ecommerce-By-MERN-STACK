const express = require('express')

const morgan = require('morgan');

const cookieParser = require('cookie-parser')

const fileUpload = require('express-fileupload')

const dotenv = require('dotenv')

const errorMiddleware = require('./middlewares/errorHandler');

const app = express()

dotenv.config({ path: 'backend/config/config.env' })

app.use(morgan('dev'));

app.use(express.json())

app.use(cookieParser())

app.use(express.urlencoded({ extended: true }));

app.use(fileUpload())

//import routes
const products = require('./routes/productRoutes')
const category = require('./routes/categoryRoutes')
const auth = require('./routes/authRoutes')
const user = require('./routes/userRoutes')
const admin = require('./routes/adminRoutes')
const order = require('./routes/orderRoutes')
const payment = require('./routes/paymentRoutes')

app.use('/api/v1', products, category, auth, user, admin, order, payment)

//handle errors
app.use(errorMiddleware)

module.exports = app

