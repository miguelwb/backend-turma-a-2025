
  @param { import("knex").Knex } knex
  @returns { Promise<void> }
 
export function up(knex) {
    return knex.schema.createTable('alunos', table => {
    table.increments('id').primary(); 
    table.text('nome').notNullable(); 
    table.text('email').notNullable(); 
    table.text('senha').notNullable(); 
    table.text('foto'); 
    table.text('ra').notNullable(); 
    table.string('role').defaultTo('aluno'); 
    table.timestamp('created_at').defaultTo(knex.fn.now()); 

    
    table.unique(['ra'], 'unique_ra');
    table.unique(['email'], 'unique_email');
    table.index(['email', 'senha'], 'login');
    table.index(['nome'], 'name');
  });
}


  @param { import("knex").Knex } knex
  @returns { Promise<void> }

export function down(knex) {
  return knex.schema.dropTableIfExists('alunos');
}
