import express from 'express';
import routerAluno from './routes/aluno.routes.js';
import routerEscola from './routes/escola.routes.js';
import routerOnibus from './routes/onibus.routes.js';
import routerMonitor from './routes/monitor.routes.js';
import routerMotorista from './routes/motorista.routes.js';
import routerPonto from './routes/ponto.routes.js';

const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.json());

server.use("/api/aluno", routerAluno);
server.use("/api/escola", routerEscola);
server.use("/api/onibus", routerOnibus);
server.use("/api/monitor", routerMonitor);
server.use("/api/motorista", routerMotorista);
server.use("/api/ponto", routerPonto);

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
