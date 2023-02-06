exports.up = knex => {
    return knex.schema.createTable('warehouses', t => {
      t.increments('id').primary().unsigned()
      t.integer('unique_code')
      t.string('name')
      t.string('location')
      t.string('status')
      t.string('capacity')
      
    })
  }
  
  exports.down = knex => {
    return knex.schema.dropTable('warehouses')
  }
  
 // name, location, unique_code, status (active/in-active), capacity