/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('alunos', table => {
    table.increments('id').primary(); // id integer [primary key, increment]
    table.text('nome').notNullable(); // nome text [not null]
    table.text('email').notNullable(); // email text [not null, unique]
    table.text('senha').notNullable(); // senha text [not null]
    table.text('foto'); // foto text [note: "URL da foto do aluno"]
    table.text('ra').notNullable(); // ra text [not null, unique]
    table.string('role').defaultTo('aluno'); // role string [default: 'aluno' note: "Tipo de usuário: aluno, motorista, monitor, admin"]
    table.timestamp('created_at').defaultTo(knex.fn.now()); // created_at timestamp

    // Índices e restrições
    table.unique(['ra'], 'unique_ra');
    table.unique(['email'], 'unique_email');
    table.index(['email', 'senha'], 'login');
    table.index(['nome'], 'name');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists('alunos');
}
