/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
//  */
exports.up = function(knex) {
    return knex.schema.createTable('products', t => {
        t.increments('id').primary().unsigned()
        t.string('product_name')
        t.integer('warehouse_id')
        t.string('warehouse_name')      
        t.integer('section_id').references('sections.id').unsigned().index().onDelete('CASCADE')
        t.string('section_name')
        t.integer('section_capacity')
        t.integer('quantity')
        t.string('product_category')
        
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
