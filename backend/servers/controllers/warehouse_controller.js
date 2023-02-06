'use strict'

const { Warehouse } = require('../models')

const postWarehouses = (req, res, next) => {
//   const userId = req.params.id
  const props = req.body
 
  Warehouse.create({ ...props })
  .then(warehouse=>{
console.log(warehouse)
  })
    // .then(warehouse => res.json({
    //   ok: true,
    //   message: 'Warehouse created',
    //   warehouse,
      
    // }
    
    // )
    // )
    .catch(next)
}

const getWarehouses = (req, res, next) => {
 

  Warehouse.findAll()
    .then(warehouses => res.json({
      ok: true,
      message: 'WareHouse found',
      warehouses,
     
    }))
    .catch(next)
}

const getWarehouse = (req, res, next) => {
  const wareHouseId = req.params.id
  console.log(req.params)


  Warehouse.findById(wareHouseId)
    .then(warehouse => res.json({
      ok: true,
      message: 'Warehouse found',
      warehouse
    }))
    .catch(next)
}

const putWarehouse = (req, res, next) => {
//   const projectId = req.params.id
  const props = req.body
  console.log(props)

  Warehouse.update(projectId, props)
    .then(project => res.json({
      ok: true,
      message: 'Warehouse updated',
      project
    }))
    .catch(next)
}

const deleteWarehouse = (req, res, next) => {
  const projectId = req.params.id

  Warehouse.destroy(projectId)
    .then(deleteCount => res.json({
      ok: true,
      message: 'Warehouse deleted',
      deleteCount
    }))
    .catch(next)
}

module.exports = {
  postWarehouses,
  getWarehouses,
  getWarehouse,
  putWarehouse,
  deleteWarehouse
}
