const {
    getAllProducts,
    createNewProduct,
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct
} = require('../controllers/productController')

const { isAuthenticated } = require('../middlewares/auth')

const router = require('express').Router()

router.route('/products').get(isAuthenticated, getAllProducts)

router.route('/products/:id').get(getSingleProduct)

router.route('/admin/products').post(isAuthenticated, createNewProduct)

router.route('/admin/products/:id')
    .put(isAuthenticated, updateSingleProduct)
    .delete(isAuthenticated, deleteSingleProduct)

module.exports = router
