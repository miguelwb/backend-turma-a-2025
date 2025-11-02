/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('rotas', table => {
    table.increments('id').primary();
    table.text('nome').notNullable();
    table.text('descricao');
    table.integer('onibus_id');
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.index(['nome'], 'name_rota');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists('rotas');
}