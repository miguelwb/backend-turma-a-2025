import { DatabaseSync } from "node:sqlite";

import {dbPath} from "../src/utils/dbpath"

console.log("Caminho impportado: " + dbPath);

let db = null;

try {
    db = new DatabaseSync(dbPath{
        verbose: console.log,
        mode: DatabaseSync.OPEN_READWRITE | DatabaseSync.OPEN_CREATE,
    });
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
} catch (error) {
    console.log(error);
}

export default db;