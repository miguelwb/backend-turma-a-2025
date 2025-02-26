import {z} from 'zod';
const paymentSchema = z.object({
    data: z.string().datetime(),
    numerorecibo: z.number().int().positive(),
    usuarioid: z.number().int().positive(),
    valor: z.number().int(),
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
    }
};
export default paymentController;