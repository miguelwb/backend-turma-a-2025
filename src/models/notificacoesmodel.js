import db from '../../db/connection.js';

export function createNotificacao(notificacaoData) {
  try {
    const { user_id, titulo, mensagem } = notificacaoData;
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

export function marcarComoLida(id) {
  try {
    const stmt = db.prepare('UPDATE notificacoes SET lido = 1 WHERE id = ?;');
    const info = stmt.run(id);
    return { success: info.changes > 0 };
  } catch (error) {
    console.error('Erro ao marcar notificação como lida:', error);
    throw error;
  }
}

export function findAllNotificacoes(userId) {
  try {
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