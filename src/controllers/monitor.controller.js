import { z } from 'zod';

const monitorSchema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    foto: z.string().min(1, "Foto é obrigatória"),
    created_at: z.string().datetime().optional(),
});

const monitorController = {
    async createMonitor(req, res) {
        try {
            const { nome, foto, created_at } = req.body;            
            monitorSchema.parse({ nome, foto, created_at });            
            console.log({ nome, foto, created_at });            
            res.status(201).json({ message: 'Monitor criado com sucesso' });
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

    async updateMonitor(req, res) {
        try {
            const { id } = req.params;
            const { nome, foto, created_at } = req.body;
            monitorSchema.parse({ nome, foto, created_at });
            console.log({ id, nome, foto, created_at });
            res.status(200).json({ message: 'Monitor atualizado com sucesso', monitor: { id, nome, foto, created_at } });
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

    async deleteMonitor(req, res) {
        try {
            const { id } = req.params;
            console.log(`Monitor com ID ${id} deletado`);
            res.status(200).json({ message: 'Monitor deletado com sucesso', id });
        } catch (error) {
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
};

export default monitorController;
