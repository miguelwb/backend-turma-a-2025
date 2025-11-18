import { z } from 'zod';
import { createEscola, updateEscola as updateEscolaModel, deleteEscola as deleteEscolaModel } from '../models/escolasmodel.js';
const escolaSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  localizacao: z.string().min(1, 'Localização é obrigatória'),
  user_id: z.number().int().optional(),
  created_at: z.string().datetime().optional(),
});
const escolaController = {
  async createEscola(req, res) {
    try {
      const { nome, localizacao, user_id, created_at } = req.body;
      escolaSchema.parse({ nome, localizacao, user_id, created_at });
      const result = await createEscola({ nome, localizacao, user_id });
      res.status(201).json({ message: 'Escola criada com sucesso', id: result.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: 'Erro de validação',
          erros: error.errors.map(err => ({ atributo: err.path[0], message: err.message })),
        });
      }
      res.status(500).json({ message: error.message });
    }
  },

  async updateEscola(req, res) {
    try {
      const { id } = req.params;
      const { nome, localizacao, created_at } = req.body;
      escolaSchema.parse({ nome, localizacao, created_at });
      const result = await updateEscolaModel(id, { nome, localizacao });
      if (result.changes === 0) {
        return res.status(404).json({ message: 'Escola não encontrada' });
      }
      res.status(200).json({ message: 'Dados da escola alterado com sucesso', escola: { id, nome, localizacao, created_at } });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Erro de Validação', details: error.errors });
      }
      res.status(500).json({ message: error.message });
    }
  },

  async deleteEscola(req, res) {
    try {
      const { id } = req.params;
      const result = await deleteEscolaModel(id);
      if (result.changes === 0) {
        return res.status(404).json({ message: 'Escola não encontrada' });
      }
      res.status(200).json({ message: 'Escola deletada', id });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};
export default escolaController;