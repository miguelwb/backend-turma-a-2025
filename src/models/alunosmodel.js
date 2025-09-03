import db from '../../db/connection.js';


export function findAll() {
  try {
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

    const checkStmt = db.prepare("SELECT id FROM alunos WHERE email = ? OR ra = ?");
    const existingAluno = checkStmt.get(email, ra);

    if (existingAluno) {
      return { conflict: true, message: "Email ou RA já cadastrado" };
    }

    const insertStmt = db.prepare(
      "INSERT INTO alunos (nome, email, ra, senha) VALUES (?, ?, ?, ?)"
    );
    const info = insertStmt.run(nome, email, ra, senha);

    return { success: true, info };
  } catch (error) {
    console.error("Erro ao criar aluno:", error);
    throw error;
  }
}


export async function login(loginAluno) {
  try {
    const { ra, senha } = loginAluno;

    const stmt = db.prepare("SELECT ra, senha FROM alunos WHERE ra = ?");
    const aluno = stmt.get(ra);

    if (!aluno) {
      return null;
    }

    if (aluno.senha === senha) {
      return aluno;
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
    const sql = "DELETE FROM alunos WHERE ra = ?";
    const statement = db.prepare(sql);
    const result = statement.run(ra);
    return { message: "Aluno deletado com sucesso" };
  } catch (error) {
    console.error("Erro ao deletar aluno:", error);
    throw error;
  }
}

export async function update(ra, alunoData) {
  try {
    const { nome, email, ra, senha } = alunoData;
    const sql = "UPDATE alunos SET nome = ?, email = ? WHERE ra = ?;";
    const statement = db.prepare(sql);
    const result = statement.run(alunoData.nome, alunoData.email, ra);
  } catch (error) {
    console.error("Erro ao atualizar aluno:", error);
    throw error;
  }
}