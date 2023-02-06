/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('sections', t => {
        t.increments('id').primary().unsigned()
        t.integer('warehouse_id')
        t.string('section_name')
        t.integer('section_capacity')
        
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
