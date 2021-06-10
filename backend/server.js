const app = require('./app')

const connectDatabase = require('./config/database')

const dotenv = require('dotenv')

dotenv.config({ path: 'backend/config/config.env' })

process.on('uncaughtException', err => {
    console.log(`the error is: ${err.message}`)
    console.log(`the error is: ${err.stack}`)
    process.exit(1)

})

connectDatabase()

const server = app.listen(process.env.PORT, () => {
    console.log(`server started at port ${process.env.PORT} in ${process.env.NODE_ENV}`)
})

process.on('unhandledRejection', err => {
    console.log(`the unhandle error is ${err.message}`)
    console.log(`the unhandle error is ${err.stack}`)
    console.log('sutting down server')
    server.close(() => process.exit(1))
})
