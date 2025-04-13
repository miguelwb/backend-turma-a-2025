import {z} from 'zod';
const alunoSchema = z.object({
    nome: z.string(),
    ra: z.string().min(1, "RA é obrigatório"),
    foto: z.string().optional(),
    created_at: z.string().datetime().optional(),
})
const alunoController = {
    async createAluno(req, res) {
        try {
            const {nome, ra, foto, created_at} = req.body;
            alunoSchema.parse({nome, ra, foto, created_at});
            console.log({nome, ra, foto});
            res.status(201).json({message:'Aluno criado com sucesso'});
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

    async updateAluno(req, res) {
        try {
            const {id} = req.params;
            const {nome, ra, foto, created_at} = req.body;
            alunoSchema.parse({nome, ra, foto, created_at});
            res.status(200).json({message:'Dados do aluno alterado com sucesso',nome:{id,nome, ra, foto, created_at}});
        } catch (error) {
            res.status(500).json({ message: error.message });
            if (error instanceof z.ZodError) {
                res.status(400).json({message: "Erro de Validação",
                    details: error.errors});
            }
        }
    },

    async deleteAluno(req, res) {
        try {
            const {id} = req.params;
            res.status(200).json({message:'Aluno Deletado', id});
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};
export default alunoController;