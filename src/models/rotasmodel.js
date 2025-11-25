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

export async function findAllRotas() {
  try {
    if (pgPool) {
      const { rows } = await pgPool.query('SELECT id, nome, descricao, onibus_id, created_at FROM rotas');
      return rows;
    }
    const stmt = db.prepare('SELECT id, nome, descricao, onibus_id, created_at FROM rotas');
    return stmt.all();
  } catch (error) {
    console.error('Erro ao listar rotas:', error);
    throw error;
  }
}

export async function updateRota(id, { nome, descricao, onibus_id }) {
  try {
    if (pgPool) {
      const res = await pgPool.query(
        'UPDATE rotas SET nome = $1, descricao = $2, onibus_id = $3 WHERE id = $4',
        [nome, descricao ?? null, onibus_id ?? null, id]
      );
      return { changes: res.rowCount };
    }
    const stmt = db.prepare('UPDATE rotas SET nome = ?, descricao = ?, onibus_id = ? WHERE id = ?');
    const info = stmt.run(nome, descricao ?? null, onibus_id ?? null, id);
    return info;
  } catch (error) {
    console.error('Erro ao atualizar rota:', error);
    throw error;
  }
}

export async function deleteRota(id) {
  try {
    if (pgPool) {
      const res = await pgPool.query('DELETE FROM rotas WHERE id = $1', [id]);
      return { changes: res.rowCount };
    }
    const stmt = db.prepare('DELETE FROM rotas WHERE id = ?');
    const info = stmt.run(id);
    return info;
  } catch (error) {
    console.error('Erro ao deletar rota:', error);
    throw error;
  }
}
