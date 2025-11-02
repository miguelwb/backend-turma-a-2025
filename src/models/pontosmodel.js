import db from '../../db/connection.js';

export function createPonto(pontoData) {
  try {
    const { nome, localizacao, foto, escolas_id, user_id, onibus_id } = pontoData;
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

export function findAllPontos() {
  try {
    const stmt = db.prepare('SELECT * FROM pontos;');
    return stmt.all();
  } catch (error) {
    console.error('Erro ao buscar pontos:', error);
    throw error;
  }
}