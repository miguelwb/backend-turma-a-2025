import { z } from 'zod';
import { createRota } from '../models/rotasmodel.js';

const rotaSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  descricao: z.string().optional(),
  onibus_id: z.number().int().optional(),
  created_at: z.string().datetime().optional(),
});

const rotaController = {
  async create(req, res) {
    try {
      const { nome, descricao, onibus_id, created_at } = req.body;
      rotaSchema.parse({ nome, descricao, onibus_id, created_at });
      const result = createRota({ nome, descricao, onibus_id });
      res.status(201).json({ message: 'Rota criada com sucesso', id: result.id });
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
};

export default rotaController;