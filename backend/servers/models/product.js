'use strict'

// name, location, unique_code, status (active/in-active), capacity
 const createGuts = require('../helpers/model-guts')


const name = 'Product'
const tableName = 'products'

const selectableProps = [
  'id',
  'product_name',
  'warehouse_id',
  'warehouse_name',
  'section_id',
  'section_name',
  'section_capacity',
  'quantity',
  'product_category'
  
]

module.exports = knex => {
  const guts = createGuts({
    knex,
    name,
    tableName,
    selectableProps
  })

  return {
    ...guts
  }
}
