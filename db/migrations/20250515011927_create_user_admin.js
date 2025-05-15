/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return await knex('alunos').insert({
  nome: 'admin',
  email: 'mobilizepv@gmail.com',
  senha: '@mobilize123',
  role: 'admin',
  ra: '08101',
});

}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  
}
