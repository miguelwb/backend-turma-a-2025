import db from '../../db/connection.js';
import pgPool from '../../db/pg.js';

export async function findAllEscolas() {
  try {
    if (pgPool) {
      const { rows } = await pgPool.query('SELECT id, nome, localizacao, user_id FROM escolas');
      return rows;
    }
    const stmt = db.prepare('SELECT id, nome, localizacao, user_id FROM escolas');
    return stmt.all();
  } catch (error) {
    console.error('Erro ao listar escolas:', error);
    throw error;
  }
}

export async function createEscola({ nome, localizacao, user_id }) {
  try {
    if (pgPool) {
      const { rows } = await pgPool.query(
        'INSERT INTO escolas (nome, localizacao, user_id) VALUES ($1, $2, $3) RETURNING id',
        [nome, localizacao, user_id ?? null]
      );
      return { success: true, id: rows[0]?.id };
    }
    const stmt = db.prepare('INSERT INTO escolas (nome, localizacao, user_id) VALUES (?, ?, ?)');
    const info = stmt.run(nome, localizacao, user_id ?? null);
    return { success: true, id: info.lastInsertRowid || info.lastInsertRowId };
  } catch (error) {
    console.error('Erro ao criar escola:', error);
    throw error;
  }
}

export async function updateEscola(id, { nome, localizacao }) {
  try {
    if (pgPool) {
      const res = await pgPool.query(
        'UPDATE escolas SET nome = $1, localizacao = $2 WHERE id = $3',
        [nome, localizacao, id]
      );
      return { changes: res.rowCount };
    }
    const stmt = db.prepare('UPDATE escolas SET nome = ?, localizacao = ? WHERE id = ?');
    const info = stmt.run(nome, localizacao, id);
    return info;
  } catch (error) {
    console.error('Erro ao atualizar escola:', error);
    throw error;
  }
}

export async function deleteEscola(id) {
  try {
    if (pgPool) {
      const res = await pgPool.query('DELETE FROM escolas WHERE id = $1', [id]);
      return { changes: res.rowCount };
    }
    const stmt = db.prepare('DELETE FROM escolas WHERE id = ?');
    const info = stmt.run(id);
    return info;
  } catch (error) {
    console.error('Erro ao deletar escola:', error);
    throw error;
  }
}