'use strict'

const router = require('express').Router()
const cors = require("cors");
router.use(cors())

const {

    getProducts,
    getProduct,
    saveProductAsWholeSection,
    deleteProduct,
    saveProductAsSectionBySection,
    getProductById,updateProduct
} = require('../controllers/product_controller')

router.route('/products')
.get(getProducts)
.post(saveProductAsWholeSection)

router.route('/products_by_section')
.post(saveProductAsSectionBySection)


router.route('/products/:id')
.get(getProductById)
.post(updateProduct)
  

  .delete(deleteProduct)

  router.route('/warehouse/:id/products')  
  .get(getProduct)




module.exports = router
 