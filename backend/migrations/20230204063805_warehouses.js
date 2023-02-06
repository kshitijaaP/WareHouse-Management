/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('warehouses', t => {
        t.increments('id').primary().unsigned()
        t.integer('unique_code')
        t.string('name')
        t.string('location')
        t.string('status')
        t.integer('capacity')
        
      })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
