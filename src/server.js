import express from 'express';
import routerAluno from './routes/aluno.routes.js';
import routerEscola from './routes/escola.routes.js';
import routerOnibus from './routes/onibus.routes.js';
import routerMonitor from './routes/monitor.routes.js';
import routerMotorista from './routes/motorista.routes.js';
import routerPonto from './routes/ponto.routes.js';
import loginRoutes from './routes/login.routes.js';

const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.json());

server.use("/api/alunos", routerAluno);
server.use("/api/escolas", routerEscola);
server.use("/api/onibus", routerOnibus);
server.use("/api/monitores", routerMonitor);
server.use("/api/motoristas", routerMotorista);
server.use("/api/pontos", routerPonto);
server.use("/api/login", loginRoutes);

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
