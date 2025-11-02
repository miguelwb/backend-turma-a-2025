import db from '../../db/connection.js';

export function createRota(rotaData) {
  try {
    const { nome, descricao, onibus_id } = rotaData;
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