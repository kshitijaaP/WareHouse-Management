'use strict'

// name, location, unique_code, status (active/in-active), capacity
 const createGuts = require('../helpers/model-guts')

const name = 'Warehouse'
const tableName = 'warehouses'

const selectableProps = [
  'id',
  'unique_code',
  'name',
  'location',
  'status',
  'capacity',
  
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
