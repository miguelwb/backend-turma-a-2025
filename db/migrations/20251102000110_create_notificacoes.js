/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('notificacoes', table => {
    table.increments('id').primary();
    table.integer('user_id').notNullable();
    table.text('titulo').notNullable();
    table.text('mensagem').notNullable();
    table.boolean('lido').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.index(['user_id'], 'idx_notificacoes_user');
    table.index(['lido'], 'idx_notificacoes_lido');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists('notificacoes');
}