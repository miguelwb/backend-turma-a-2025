import db from '../../db/connection.js';
import pgPool from '../../db/pg.js';

export async function createPonto(pontoData) {
  try {
    const { nome, localizacao, foto, escolas_id, user_id, onibus_id } = pontoData;
    if (pgPool) {
      const res = await pgPool.query(
        `INSERT INTO pontos (nome, localizacao, foto, escolas_id, user_id, onibus_id)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;`,
        [nome, localizacao, foto ?? null, escolas_id ?? null, user_id ?? null, onibus_id ?? null]
      );
      return { success: true, id: res.rows[0].id };
    }
    const stmt = db.prepare(
      `INSERT INTO pontos (nome, localizacao, foto, escolas_id, user_id, onibus_id)
       VALUES (?, ?, ?, ?, ?, ?)`
    );
    const info = stmt.run(nome, localizacao, foto ?? null, escolas_id ?? null, user_id ?? null, onibus_id ?? null);
    return { success: true, id: info.lastInsertRowid || info.lastInsertRowId };
  } catch (error) {
    console.error('Erro ao criar ponto:', error);
    throw error;
  }
}

export async function findAllPontos() {
  try {
    if (pgPool) {
      const res = await pgPool.query('SELECT * FROM pontos ORDER BY id DESC;');
      return res.rows;
    }
    const stmt = db.prepare('SELECT * FROM pontos;');
    return stmt.all();
  } catch (error) {
    console.error('Erro ao buscar pontos:', error);
    throw error;
  }
}