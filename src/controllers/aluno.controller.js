
import { findAll, create, remove, update} from '../models/alunosmodel.js';

export const getAllAlunos = async (req, res) => {
    try {
        const alunos = await findAll();
        res.status(200).json(alunos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error - Controller" });
    }
}

export const createAluno = async (req, res) => {
    try {
    const alunoData = req.body;

    if (!alunoData.nome || !alunoData.email || !alunoData.ra || !alunoData.senha) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    const result = await create(alunoData);
    res.status(201).json({
      message: "Aluno criado com sucesso",
      alunoId: result.lastInsertRowId
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error - Controller" });
  }
};
export const deleteAluno = async (req, res) => {
  try {
    const { ra } = req.params;
    const result = await remove(ra);
    if (result.changes === 0) {
      return res.status(404).json({ message: "Aluno não encontrado" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error - Controller" });
  }
}

export const updateAluno = async (req, res) => {
  try {
    const { ra } = req.params;
    const alunoData = req.body;
    const result = await update(ra, alunoData);
    if (result.changes === 0) {
      return res.status(404).json({ message: "Aluno não encontrado" });
    }
    res.status(200).json({ message: "Aluno atualizado com sucesso" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error - Controller" });
  }
}