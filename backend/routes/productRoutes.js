const {
    getAllProducts,
    createNewProduct,
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct
} = require('../controllers/productController')

const { isAuthenticated, authorizeRoles } = require('../middlewares/auth')

const router = require('express').Router()

router.route('/products').get(isAuthenticated, authorizeRoles('admin'), getAllProducts)

router.route('/products/:id').get(isAuthenticated, getSingleProduct)

router.route('/admin/products').post(isAuthenticated, authorizeRoles('admin'), createNewProduct)

router.route('/admin/products/:id')
    .put(isAuthenticated, authorizeRoles('admin'), updateSingleProduct)
    .delete(isAuthenticated, authorizeRoles('admin'), deleteSingleProduct)

module.exports = router
