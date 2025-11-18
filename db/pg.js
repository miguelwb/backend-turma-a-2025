import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;
let pool = null;

if (connectionString) {
  pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
  pool.on('error', (err) => console.error('Erro no pool PG:', err));
}

export default pool;