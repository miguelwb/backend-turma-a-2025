import express from 'express';
import routerAluno from './routes/aluno.routes.js';
import routerEscola from './routes/escola.routes.js';
import routerOnibus from './routes/onibus.routes.js';
import routerMonitor from './routes/monitor.routes.js';
import routerMotorista from './routes/motorista.routes.js';
import routerPonto from './routes/ponto.routes.js';
import loginRoutes from './routes/login.routes.js';
import rotaRoutes from './routes/rota.routes.js';
import notificacaoRoutes from './routes/notificacao.routes.js';
import contatoRoutes from './routes/contato.routes.js';
import path from 'node:path';

const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.json());
server.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')));

server.use("/api/alunos", routerAluno);
server.use("/api/escolas", routerEscola);
server.use("/api/onibus", routerOnibus);
server.use("/api/monitores", routerMonitor);
server.use("/api/motoristas", routerMotorista);
server.use("/api/pontos", routerPonto);
server.use("/api/login", loginRoutes);
server.use("/api/rotas", rotaRoutes);
server.use("/api/notificacoes", notificacaoRoutes);
server.use("/api/contato", contatoRoutes);

server.get("/", (req, res) => {
    res.send("GET " + new Date());
});

server.post("/", (req, res) => {
    res.send("POST " + new Date());
});

server.patch("/", (req, res) => {
    res.send("PATCH " + new Date());
});

server.delete("/", (req, res) => {
    res.send("DELETE " + new Date());
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
