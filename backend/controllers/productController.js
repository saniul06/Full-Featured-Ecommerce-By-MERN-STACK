const Product = require('../models/Product')
const ErrorHandler = require('../utils/Errors')
const asyncErrorHandler = require('../middlewares/asyncErrorHandler')
const ApiFeatures = require('../utils/apiFeatures')

exports.getAllProducts = asyncErrorHandler(async (req, res, next) => {
    const totalProduct = await Product.countDocuments()
    console.log('total totalProduct is: ', totalProduct)

    const itemPerPage = 5
    const apiFeatures = new ApiFeatures(Product, req.query)
        .search()
        .filter()
        .pagination(itemPerPage)

    const products = await apiFeatures.collection;
    res.status(200).json({
        success: true,
        count: products.length,
        totalProduct,
        products
    })
})

exports.createNewProduct = asyncErrorHandler(async (req, res, next) => {

    req.body.user = req.user._id
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        message: 'product created successfully'
    })
})

exports.getSingleProduct = asyncErrorHandler(async (req, res, next) => {

    const product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler('product not found', 404))
    }

    res.status(200).json({ success: true, product })
})

exports.updateSingleProduct = asyncErrorHandler(async (req, res, next) => {

    let product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler('product not found', 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({ success: true, product })

})

exports.deleteSingleProduct = asyncErrorHandler(async (req, res, next) => {

    let product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler('product not found', 404))
    }

    product.remove()
    res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
    })
})