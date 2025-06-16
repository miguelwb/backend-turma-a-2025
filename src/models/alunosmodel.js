import db from '../../db/connection.js';


export function findAll() {
  try {
    const query = "SELECT * FROM alunos;";
    const statement = db.prepare(query);
    const alunos = statement.all();
    // console.log(alunos)
    // console.log("Alunos encontrados:", alunos); // veja se imprime no terminal
    return alunos;
  } catch (error) {
    console.error('Error fetching all students: ' + error.message);
    throw error;
  }
}
export async function create(alunoData) {
    try {
    const { nome, email, ra, senha } = alunoData;

    const stmt = db.prepare(
      "INSERT INTO alunos (nome, email, ra, senha) VALUES (?, ?, ?, ?)"
    );

    return stmt.run(nome, email, ra, senha);
  } catch (error) {
    console.error("Erro ao criar aluno:", error);
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
