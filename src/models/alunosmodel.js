import database from '../../db/connection.js';

export async function findAll() {
    try {
        const query = "SELECT id, nome, email, foto, ra FROM alunos";
        const statement = database.prepare(query);
        const alunos = statement.all();
        statement.finalize();
        return alunos;
    } catch (error) {
        console.error('Error fetching all students: ' + error.message);
    } finally {
        database.close();
    }
}
export async function create(alunoData) {
    try {
        const query = "INSERT INTO alunos (nome, email, ra) VALUES (?, ?, ?);";
        const statement = database.prepare(query);
        const result = statement.run(alunoData.nome, alunoData.email, alunoData.ra);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error creating aluno" + error.message);
    } finally {
        database.close();
    }
}