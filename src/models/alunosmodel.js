import db from '../../db/connection.js';
import pgPool from '../../db/pg.js';


export async function findAll() {
  try {
    if (pgPool) {
      const { rows } = await pgPool.query('SELECT id, nome, email, ra, role, foto FROM alunos');
      return rows;
    }
    const query = "SELECT * FROM alunos;";
    const statement = db.prepare(query);
    const alunos = statement.all();
    return alunos;
  } catch (error) {
    console.error('Error fetching all students: ' + error.message);
    throw error;
  }
}
export async function create(alunoData) {
  try {
    const { nome, email, ra, senha } = alunoData;

    if (pgPool) {
      // Verifica conflitos por email ou RA
      const { rows: existentes } = await pgPool.query(
        'SELECT id FROM alunos WHERE email = $1 OR ra = $2',
        [email, ra]
      );
      if (existentes.length > 0) {
        return { conflict: true, message: 'Email ou RA já cadastrado' };
      }
      const { rows } = await pgPool.query(
        'INSERT INTO alunos (nome, email, ra, senha) VALUES ($1, $2, $3, $4) RETURNING id',
        [nome, email, ra, senha]
      );
      return { success: true, id: rows[0]?.id };
    }

    const checkStmt = db.prepare("SELECT id FROM alunos WHERE email = ? OR ra = ?");
    const existingAluno = checkStmt.get(email, ra);

    if (existingAluno) {
      return { conflict: true, message: "Email ou RA já cadastrado" };
    }

    const insertStmt = db.prepare(
      "INSERT INTO alunos (nome, email, ra, senha) VALUES (?, ?, ?, ?)"
    );
    const info = insertStmt.run(nome, email, ra, senha);

    return { success: true, id: info.lastInsertRowid || info.lastInsertRowId };
  } catch (error) {
    console.error("Erro ao criar aluno:", error);
    throw error;
  }
}


export async function login(loginAluno) {
  try {
    const { ra, senha } = loginAluno;
    if (pgPool) {
      const { rows } = await pgPool.query(
        'SELECT id, nome, email, ra, role, senha, foto FROM alunos WHERE ra = $1',
        [ra]
      );
      const aluno = rows[0];
      if (!aluno) return null;
      if (aluno.senha === senha) {
        const { senha: _omit, ...sanitized } = aluno;
        return sanitized;
      }
      return null;
    }
    const stmt = db.prepare("SELECT id, nome, email, ra, role, senha FROM alunos WHERE ra = ?");
    const aluno = stmt.get(ra);
    if (!aluno) {
      return null;
    }
    if (aluno.senha === senha) {
      const { senha: _, ...sanitized } = aluno;
      return sanitized;
    } else {
      return null; 
    }
  } catch (error) {
    console.error("erro ao logar:", error);
    throw error;
  }
}


export async function remove(ra) {
  try {
    if (pgPool) {
      const res = await pgPool.query('DELETE FROM alunos WHERE ra = $1', [ra]);
      return { changes: res.rowCount };
    }
    const sql = "DELETE FROM alunos WHERE ra = ?";
    const statement = db.prepare(sql);
    const info = statement.run(ra);
    return info;
  } catch (error) {
    console.error("Erro ao deletar aluno:", error);
    throw error;
  }
}

export async function update(ra, alunoData) {
  try {
    const { nome, email } = alunoData;
    if (pgPool) {
      const res = await pgPool.query(
        'UPDATE alunos SET nome = $1, email = $2 WHERE ra = $3',
        [nome, email, ra]
      );
      return { changes: res.rowCount };
    }
    const sql = "UPDATE alunos SET nome = ?, email = ? WHERE ra = ?;";
    const statement = db.prepare(sql);
    const info = statement.run(nome, email, ra);
    return info;
  } catch (error) {
    console.error("Erro ao atualizar aluno:", error);
    throw error;
  }
}

export async function updateFoto(ra, fotoPath) {
  try {
    if (pgPool) {
      const res = await pgPool.query('UPDATE alunos SET foto = $1 WHERE ra = $2', [fotoPath, ra]);
      return { changes: res.rowCount };
    }
    const stmt = db.prepare('UPDATE alunos SET foto = ? WHERE ra = ?;');
    const info = stmt.run(fotoPath, ra);
    return info;
  } catch (error) {
    console.error('Erro ao atualizar foto do aluno:', error);
    throw error;
  }
}