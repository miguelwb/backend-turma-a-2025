import express from 'express';
const router = express.Router();
import { login } from '../models/alunosmodel.js';

router.post('/', async (req, res) => {
  const { ra, senha } = req.body;

  if (!ra || !senha) {
    return res.status(400).json({ success: false, mensagem: "campos faltando" });
  }

  try {
    const aluno = await login({ ra, senha });

    if (!aluno) {
      return res.status(401).json({ success: false, mensagem: "RA ou senha incorretos" });
    }


    return res.json({ success: true, mensagem: "Login realizado com sucesso", aluno });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, mensagem: "Erro interno do servidor" });
  }
});

export default router;
