import { z } from 'zod';
import { createRota, findAllRotas, updateRota, deleteRota } from '../models/rotasmodel.js';

const createUpdateSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  descricao: z.string().optional(),
  onibus_id: z.number().int().optional(),
  created_at: z.string().datetime().optional(),
});

function normalizeRouteBody(body) {
  const nome = body?.nome ?? body?.name ?? body?.routeName;
  const schoolName = body?.schoolName ?? body?.escola ?? body?.school ?? null;
  const pointIds = body?.pointIds ?? body?.pontos_id ?? body?.pontos ?? [];
  const horarios = body?.horarios ?? body?.schedules ?? [];
  const onibus_id = body?.onibus_id ?? null;
  return { nome, schoolName, pointIds, horarios, onibus_id };
}

function serializeDescricao({ schoolName, pointIds, horarios }) {
  try {
    return JSON.stringify({ schoolName, pointIds, horarios });
  } catch (e) {
    return null;
  }
}

function parseDescricao(descricao) {
  if (!descricao) return { schoolName: null, pointIds: [], horarios: [] };
  try {
    const parsed = JSON.parse(descricao);
    return {
      schoolName: parsed?.schoolName ?? null,
      pointIds: Array.isArray(parsed?.pointIds) ? parsed.pointIds : [],
      horarios: Array.isArray(parsed?.horarios) ? parsed.horarios : [],
    };
  } catch {
    return { schoolName: null, pointIds: [], horarios: [] };
  }
}

const rotaController = {
  async list(req, res) {
    try {
      const rotas = await findAllRotas();
      const mapped = rotas.map(r => {
        const meta = parseDescricao(r.descricao);
        return {
          id: r.id,
          nome: r.nome,
          escola: meta.schoolName,
          schoolName: meta.schoolName,
          pontos: meta.pointIds,
          pontos_id: meta.pointIds,
          pointIds: meta.pointIds,
          horarios: meta.horarios,
          schedules: meta.horarios,
          onibus_id: r.onibus_id ?? null,
          created_at: r.created_at,
        };
      });
      return res.status(200).json(mapped);
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  async create(req, res) {
    try {
      const { nome, schoolName, pointIds, horarios, onibus_id } = normalizeRouteBody(req.body);
      if (!nome) {
        return res.status(400).json({ message: 'Nome é obrigatório' });
      }
      const descricao = serializeDescricao({ schoolName, pointIds, horarios });
      createUpdateSchema.parse({ nome, descricao, onibus_id });
      const result = await createRota({ nome, descricao, onibus_id });
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

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, schoolName, pointIds, horarios, onibus_id } = normalizeRouteBody(req.body);
      if (!nome) {
        return res.status(400).json({ message: 'Nome é obrigatório' });
      }
      const descricao = serializeDescricao({ schoolName, pointIds, horarios });
      createUpdateSchema.parse({ nome, descricao, onibus_id });
      const result = await updateRota(id, { nome, descricao, onibus_id });
      if (result.changes === 0) {
        return res.status(404).json({ message: 'Rota não encontrada' });
      }
      return res.status(200).json({ message: 'Rota atualizada com sucesso', rota: { id, nome, escola: schoolName, pontos: pointIds, horarios } });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Erro de validação', detalhes: error.errors });
      }
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  async remove(req, res) {
    try {
      const { id } = req.params;
      const result = await deleteRota(id);
      if (result.changes === 0) {
        return res.status(404).json({ message: 'Rota não encontrada' });
      }
      return res.status(200).json({ message: 'Rota removida com sucesso', id });
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
};

export default rotaController;
