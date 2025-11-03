import { z } from 'zod';
import { createPonto } from '../models/pontosmodel.js';

const pontoSchema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    localizacao: z.string().min(1, "Localização é obrigatória"),
    foto: z.string().optional(),
    escolas_id: z.number().int().optional(),
    user_id: z.number().int().optional(),
    onibus_id: z.number().int().optional(),
    created_at: z.string().datetime().optional(),
});

const pontoController = {
    async createPonto(req, res) {
        try {
            const { nome, localizacao, foto, escolas_id, user_id, onibus_id, created_at } = req.body;
            pontoSchema.parse({ nome, localizacao, foto, escolas_id, user_id, onibus_id, created_at });
            const result = createPonto({ nome, localizacao, foto, escolas_id, user_id, onibus_id });
            res.status(201).json({ message: 'Ponto de ônibus criado com sucesso', id: result.id });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    message: "Erro de validação",
                    erros: error.errors.map(err => ({
                        atributo: err.path[0],
                        message: err.message,
                    })),
                });
            }
            res.status(500).json({ message: error.message });
        }
    },

    async updatePonto(req, res) {
        try {
            const { id } = req.params;
            const { nome, localizacao, foto, escolas_id, user_id, onibus_id, created_at } = req.body;
            pontoSchema.parse({ nome, localizacao, foto, escolas_id, user_id, onibus_id, created_at });
            console.log({ id, nome, localizacao, foto, escolas_id, user_id, onibus_id, created_at });
            res.status(200).json({ message: 'Ponto de ônibus atualizado com sucesso', ponto: { id, nome, localizacao, foto, escolas_id, user_id, onibus_id, created_at } });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    message: "Erro de validação",
                    erros: error.errors.map(err => ({
                        atributo: err.path[0],
                        message: err.message,
                    })),
                });
            }
            res.status(500).json({ message: error.message });
        }
    },

    async deletePonto(req, res) {
        try {
            const { id } = req.params;
            console.log(`Ponto de ônibus com ID ${id} deletado`);
            res.status(200).json({ message: 'Ponto de ônibus deletado com sucesso', id });
        } catch (error) {
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
};

export default pontoController;
