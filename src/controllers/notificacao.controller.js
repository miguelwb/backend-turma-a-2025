import { z } from 'zod';
import { createNotificacao, marcarComoLida } from '../models/notificacoesmodel.js';

const notificacaoSchema = z.object({
  user_id: z.number().int().min(1, 'ID do usuário é obrigatório'),
  titulo: z.string().min(1, 'Título é obrigatório'),
  mensagem: z.string().min(1, 'Mensagem é obrigatória'),
  created_at: z.string().datetime().optional(),
});

const notificacaoController = {
  async create(req, res) {
    try {
      const { user_id, titulo, mensagem, created_at } = req.body;
      notificacaoSchema.parse({ user_id, titulo, mensagem, created_at });
      const result = createNotificacao({ user_id, titulo, mensagem });
      res.status(201).json({ message: 'Notificação criada com sucesso', id: result.id });
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

  async marcarLida(req, res) {
    try {
      const { id } = req.params;
      const result = marcarComoLida(Number(id));
      if (!result.success) {
        return res.status(404).json({ message: 'Notificação não encontrada' });
      }
      res.status(200).json({ message: 'Notificação marcada como lida' });
    } catch (error) {
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },
};

export default notificacaoController;