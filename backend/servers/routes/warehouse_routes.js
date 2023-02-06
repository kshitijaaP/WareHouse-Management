'use strict'

const router = require('express').Router()
const cors = require("cors");
router.use(cors())

const {
    postWarehouses,
    getWarehouses,
    getWarehouse,
    putWarehouse,
    deleteWarehouse
} = require('../controllers/warehouse_controller')

router.route('/warehouses')
.get(getWarehouses)
.post(postWarehouses)

router.route('/warehouse/:id')


  .get(getWarehouse)
  
  .put(putWarehouse)
  .delete(deleteWarehouse)

module.exports = router
 