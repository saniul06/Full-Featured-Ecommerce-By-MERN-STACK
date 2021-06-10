const mongoose = require('mongoose')

const dotenv = require('dotenv')

dotenv.config({ path: 'backend/config/config.env' })

const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
        .then(con => {
            console.log(`database connected at host: ${con.connection.host}`)
        })
}

module.exports = connectDatabase