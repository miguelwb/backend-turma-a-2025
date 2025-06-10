/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('escolas', table => {
    table.increments('id').primary(); 
    table.text('nome').notNullable(); 
    table.text('localizacao'); 
    table.integer('user_id'); 
    table.timestamp('created_at').defaultTo(knex.fn.now()); 

   
    table.index(['nome'], 'name_escola');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTableIfExists('escolas');
}
