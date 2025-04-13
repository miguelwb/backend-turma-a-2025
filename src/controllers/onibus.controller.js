import { z } from 'zod';

const onibusSchema = z.object({
    placa: z.string().min(1, "Placa é obrigatória"),
    marca: z.string().min(1, "Marca é obrigatória"),
    numero: z.string().min(1, "Número é obrigatório"),
    horarios: z.string().min(1, "Horários são obrigatórios"),
    monitor_id: z.number().int().min(1, "Monitor ID é obrigatório"),
    motorista_id: z.number().int().min(1, "Motorista ID é obrigatório"),
    created_at: z.string().datetime().optional(),
});

const onibusController = {
    async createOnibus(req, res) {
        try {
            const { placa, marca, numero, horarios, monitor_id, motorista_id, created_at } = req.body;
            onibusSchema.parse({ placa, marca, numero, horarios, monitor_id, motorista_id, created_at });
            console.log({ placa, marca, numero, horarios, monitor_id, motorista_id, created_at });
            res.status(201).json({ message: 'Ônibus criado com sucesso' });
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

    async updateOnibus(req, res) {
        try {
            const { id } = req.params;
            const { placa, marca, numero, horarios, monitor_id, motorista_id, created_at } = req.body;
            onibusSchema.parse({ placa, marca, numero, horarios, monitor_id, motorista_id, created_at });
            console.log({ id, placa, marca, numero, horarios, monitor_id, motorista_id, created_at });
            res.status(200).json({ message: 'Ônibus atualizado com sucesso', onibus: { id, placa, marca, numero, horarios, monitor_id, motorista_id, created_at } });
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

    async deleteOnibus(req, res) {
        try {
            const { id } = req.params;
            console.log(`Ônibus com ID ${id} deletado`);
            res.status(200).json({ message: 'Ônibus deletado com sucesso', id });
        } catch (error) {
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
};

export default onibusController;