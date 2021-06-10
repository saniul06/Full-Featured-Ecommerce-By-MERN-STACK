const connectDatabase = require('../config/database')

const Product = require('../models/Product')

const products = require('../data/products.json')

connectDatabase()

const seedProducts = async () => {
    try {
        const p = await Product.deleteMany()
        console.log('deleted products')

        const i = await Product.insertMany(products)
        console.log('inserted products')

    } catch (err) {
        console.log(err.message)
        process.exit()
    }
}

seedProducts()