
import { findAll, create, remove, update, updateFoto, login } from '../models/alunosmodel.js';

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

    if (result.conflict) {
      return res.status(409).json({ message: "Email ou RA já cadastrado" });
    }

    res.status(201).json({
      message: "Aluno criado com sucesso",
      alunoId: result.info.lastInsertRowid || result.info.lastInsertRowId
    });
  } catch (error) {
    console.error(error);
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

export const loginAluno = async (req, res) => {
  try {
    const { ra, senha } = req.body;

    if (!ra || !senha) {
      return res.status(400).json({ message: "RA e senha são obrigatórios" });
    }

    const aluno = await login({ ra, senha });

    if (!aluno) {
      return res.status(401).json({ message: "RA ou senha incorretos" });
    }

    res.status(200).json({ message: "Login realizado com sucesso", aluno, nome: aluno?.nome });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error - Controller" });
  }
};

export const uploadFotoAluno = async (req, res) => {
  try {
    const { ra } = req.params;
    if (!req.file) {
      return res.status(400).json({ message: 'Arquivo de foto não enviado' });
    }
    const fotoUrl = `/uploads/${req.file.filename}`;
    const result = updateFoto(ra, fotoUrl);
    if (result.changes === 0) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }
    return res.status(200).json({ message: 'Foto atualizada com sucesso', foto: fotoUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error - Controller' });
  }
}