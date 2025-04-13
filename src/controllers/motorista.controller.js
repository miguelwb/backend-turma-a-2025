import { z } from 'zod';

const motoristaSchema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    foto: z.string().min(1, "Foto é obrigatória"),
    created_at: z.string().datetime().optional(),
});

const motoristaController = {
    async createMotorista(req, res) {
        try {
            const { nome, foto, created_at } = req.body;
            motoristaSchema.parse({ nome, foto, created_at });
            console.log({ nome, foto, created_at });
            res.status(201).json({ message: 'Motorista criado com sucesso' });
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

    async updateMotorista(req, res) {
        try {
            const { id } = req.params;
            const { nome, foto, created_at } = req.body;
            motoristaSchema.parse({ nome, foto, created_at });
            console.log({ id, nome, foto, created_at });            
            res.status(200).json({ message: 'Motorista atualizado com sucesso', motorista: { id, nome, foto, created_at } });
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

    async deleteMotorista(req, res) {
        try {
            const { id } = req.params;
            console.log(`Motorista com ID ${id} deletado`);
            res.status(200).json({ message: 'Motorista deletado com sucesso', id });
        } catch (error) {
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
};

export default motoristaController;
