import db from '../../db/connection.js';
import pgPool from '../../db/pg.js';

export async function createNotificacao(notificacaoData) {
  try {
    const { user_id, titulo, mensagem } = notificacaoData;
    if (pgPool) {
      const res = await pgPool.query(
        'INSERT INTO notificacoes (user_id, titulo, mensagem) VALUES ($1, $2, $3) RETURNING id;',
        [user_id, titulo, mensagem]
      );
      return { success: true, id: res.rows[0].id };
    }
    const stmt = db.prepare(
      `INSERT INTO notificacoes (user_id, titulo, mensagem)
       VALUES (?, ?, ?)`
    );
    const info = stmt.run(user_id, titulo, mensagem);
    return { success: true, id: info.lastInsertRowid || info.lastInsertRowId };
  } catch (error) {
    console.error('Erro ao criar notificação:', error);
    throw error;
  }
}

export async function marcarComoLida(id) {
  try {
    if (pgPool) {
      const res = await pgPool.query('UPDATE notificacoes SET lido = TRUE WHERE id = $1;', [id]);
      return { success: res.rowCount > 0 };
    }
    const stmt = db.prepare('UPDATE notificacoes SET lido = 1 WHERE id = ?;');
    const info = stmt.run(id);
    return { success: info.changes > 0 };
  } catch (error) {
    console.error('Erro ao marcar notificação como lida:', error);
    throw error;
  }
}

export async function findAllNotificacoes(userId) {
  try {
    if (pgPool) {
      if (userId) {
        const res = await pgPool.query('SELECT * FROM notificacoes WHERE user_id = $1 ORDER BY id DESC;', [userId]);
        return res.rows;
      }
      const res = await pgPool.query('SELECT * FROM notificacoes ORDER BY id DESC;');
      return res.rows;
    }
    if (userId) {
      const stmt = db.prepare('SELECT * FROM notificacoes WHERE user_id = ? ORDER BY id DESC;');
      return stmt.all(userId);
    }
    const stmt = db.prepare('SELECT * FROM notificacoes ORDER BY id DESC;');
    return stmt.all();
  } catch (error) {
    console.error('Erro ao buscar notificações:', error);
    throw error;
  }
}