'use strict'

// name, location, unique_code, status (active/in-active), capacity
 const createGuts = require('../helpers/model-guts')

const name = 'Section'
const tableName = 'sections'

const selectableProps = [

  'id',
  'warehouse_id',
  'section_name',
  'section_capacity',
  
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
