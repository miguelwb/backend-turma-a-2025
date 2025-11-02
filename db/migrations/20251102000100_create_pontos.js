/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('pontos', table => {
    table.increments('id').primary();
    table.text('nome').notNullable();
    table.text('localizacao').notNullable();
    table.text('foto');
    table.integer('escolas_id');
    table.integer('user_id');
    table.integer('onibus_id');
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.index(['nome'], 'name_ponto');
    table.index(['localizacao'], 'location_ponto');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists('pontos');
}