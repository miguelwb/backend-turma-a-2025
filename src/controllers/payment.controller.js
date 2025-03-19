import {z} from 'zod';
const paymentSchema = z.object({
    data: z.string().datetime(),
    valor: z.number(),
    numero: z.number().int().positive(),
    observacao: z.string().max(100).optional(),
})
const paymentController = {
    async createPayment(req, res) {
        try {
            const {data, numerorecibo, usuarioid, valor, observacao} = req.body;
            paymentSchema.parse({data, numerorecibo, usuarioid, valor, observacao});
            console.log({data, numerorecibo, usuarioid, valor, observacao});
            res.status(201).json({message:'Payment create sucefully'});
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    message: "Erro de validação",
                    erros: error.errors.map(
                        err => ({
                            atributo: err.path[0],
                            message: err.message,
                        })
                    )
                });
            }
            res.status(500).json({ message: error.message });
        }
    },

    async upadtePayment(req, res) {
        try {
            const {id} = req.params;
            const {valor, numero, data, observacao} = req.body;
            paymentSchema.parse({valor, numero, data, observacao});
            res.status(200).json({message:'Payment update sucefully',data:{id,valor, numero, data, observacao}});
        } catch (error) {
            res.status(500).json({ message: error.message });
            if (error instanceof z.ZodError) {
                res.status(400).json({message: "Validation error",
                    details: error.errors});
            }
        }
    },

    async deletePayment(req, res) {
        try {
            const {id} = req.params;
            res.status(200).json({message:'Payment deleted', id});
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};
export default paymentController;