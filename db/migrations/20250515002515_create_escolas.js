/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('escolas', table => {
    table.increments('id').primary(); // id integer [primary key]
    table.text('nome').notNullable(); // nome varchar
    table.text('localizacao'); // localizacao varchar
    table.integer('user_id'); // user_id integer
    table.timestamp('created_at').defaultTo(knex.fn.now()); // created_at timestamp

    // Índices
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
