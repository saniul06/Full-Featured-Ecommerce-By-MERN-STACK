const {
    getAllProducts,
    createNewProduct,
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct,
    createProductReview,
    getProductReviews,
    deleteReview
} = require('../controllers/productController')

const { isAuthenticated, authorizeRoles } = require('../middlewares/auth')

const router = require('express').Router()

router.route('/products').get(getAllProducts)

router.route('/products/:id').get(getSingleProduct)

router.route('/admin/products').post(isAuthenticated, authorizeRoles('admin'), createNewProduct)

router.route('/admin/products/:id')
    .put(isAuthenticated, authorizeRoles('admin'), updateSingleProduct)
    .delete(isAuthenticated, authorizeRoles('admin'), deleteSingleProduct)

router.route('/review')
    .put(isAuthenticated, createProductReview)
    .delete(isAuthenticated, deleteReview)

router.route('/reviews').get(isAuthenticated, getProductReviews)


module.exports = router
