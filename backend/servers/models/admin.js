'use strict'

// name, location, unique_code, status (active/in-active), capacity
 const createGuts = require('../helpers/model-guts')

const name = 'Admin'
const tableName = 'admin'

const selectableProps = [

  'id',
  'email_id',
  'password',
  
  
  
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
