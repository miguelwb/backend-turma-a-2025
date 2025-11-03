import Database from 'better-sqlite3';
import { dbPath } from "../src/utils/dbpath.js";

let db = null;

try {
    db = new Database(dbPath, {
        verbose: console.log,
    });
    console.log("Banco de dados conectado com sucesso!");
} catch (error) {
    console.log(error);
}

export default db;