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

exports.createProductReview = asyncErrorHandler(async (req, res, next) => {
    const { productId, rating, comment } = req.body

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId)
    const isReviewed = product.reviews.find(item => item.user.toString() === req.user._id.toString())

    if (isReviewed) {
        product.reviews.forEach(item => {
            if (item.user.toString() === req.user._id.toString()) {
                item.rating = rating
                item.comment = comment
            }
        })
    } else {
        product.reviews.push(review)
        product.numberOfReviews = product.reviews.length
    }

    if (product.reviews.length > 0) {
        product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
    } else {
        product.ratings = 0
    }

    product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
        message: 'Review added successfully'
    })

})

exports.getProductReviews = asyncErrorHandler(async (req, res, next) => {
    const product = await Product.findById(req.query.id)

    if (!product) {
        return next(new ErrorHandler(`Product not found with this id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

exports.deleteReview = asyncErrorHandler(async (req, res, next) => {
    const product = await Product.findById(req.query.productId)

    if (!product) {
        return next(new ErrorHandler(`Product not found with this id: ${req.query.id}`))
    }

    product.reviews = product.reviews.filter(item => item._id.toString() !== req.query.id.toString())

    if (product.reviews.length > 0) {
        product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
    }

    product.numberOfReviews = product.reviews.length

    await product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true
    })

})