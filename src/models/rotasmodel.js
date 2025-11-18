import db from '../../db/connection.js';
import pgPool from '../../db/pg.js';

export async function createRota(rotaData) {
  try {
    const { nome, descricao, onibus_id } = rotaData;
    if (pgPool) {
      const { rows } = await pgPool.query(
        'INSERT INTO rotas (nome, descricao, onibus_id) VALUES ($1, $2, $3) RETURNING id',
        [nome, descricao ?? null, onibus_id ?? null]
      );
      return { success: true, id: rows[0]?.id };
    }
    const stmt = db.prepare(
      `INSERT INTO rotas (nome, descricao, onibus_id)
       VALUES (?, ?, ?)`
    );
    const info = stmt.run(nome, descricao ?? null, onibus_id ?? null);
    return { success: true, id: info.lastInsertRowid || info.lastInsertRowId };
  } catch (error) {
    console.error('Erro ao criar rota:', error);
    throw error;
  }
}