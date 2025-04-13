import {z} from 'zod';
const escolaSchema = z.object({
    nome: z.string(),
    localizacao: z.string(),
    created_at: z.string().datetime().optional(),
})
const escolaController = {
    async createEscola(req, res) {
        try {
            const {nome, localizacao, created_at} = req.body;
            escolaSchema.parse({nome, localizacao, created_at});
            console.log({nome, localizacao, created_at});
            res.status(201).json({message:'Escola criada com sucesso'});
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

    async updateEscola(req, res) {
        try {
            const {id} = req.params;
            const {nome, localizacao} = req.body;
            escolaSchema.parse({nome, localizacao, created_at});
            res.status(200).json({message:'Dados da escola alterado com sucesso',escola:{id,nome, localizacao, created_at}});
        } catch (error) {
            res.status(500).json({ message: error.message });
            if (error instanceof z.ZodError) {
                res.status(400).json({message: "Erro de Validação",
                    details: error.errors});
            }
        }
    },

    async deleteEscola(req, res) {
        try {
            const {id} = req.params;
            res.status(200).json({message:'Escola Deletada', id});
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};
export default escolaController;