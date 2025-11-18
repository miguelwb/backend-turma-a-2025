import { Client } from 'pg';

async function main() {
  const connectionString = process.argv[2] || process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('Forneça a URL de conexão Postgres como primeiro argumento ou em DATABASE_URL');
    process.exit(1);
  }

  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  try {
    await client.connect();
    console.log('Conectado ao Neon com sucesso');

    // Criar tabelas se não existirem (baseado nos migrations)
    await client.query(`
      CREATE TABLE IF NOT EXISTS notificacoes (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        titulo TEXT NOT NULL,
        mensagem TEXT NOT NULL,
        lido BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_notificacoes_user ON notificacoes (user_id);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_notificacoes_lido ON notificacoes (lido);`);

    await client.query(`
      CREATE TABLE IF NOT EXISTS pontos (
        id SERIAL PRIMARY KEY,
        nome TEXT NOT NULL,
        localizacao TEXT NOT NULL,
        foto TEXT,
        escolas_id INTEGER,
        user_id INTEGER,
        onibus_id INTEGER,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    await client.query(`CREATE INDEX IF NOT EXISTS name_ponto ON pontos (nome);`);
    await client.query(`CREATE INDEX IF NOT EXISTS location_ponto ON pontos (localizacao);`);

    // Inserções de exemplo
    const notifRes = await client.query(
      `INSERT INTO notificacoes (user_id, titulo, mensagem) VALUES ($1, $2, $3) RETURNING id`,
      [1, 'Boas-vindas', 'Seu cadastro foi realizado.']
    );
    console.log('Notificação inserida, id =', notifRes.rows[0].id);

    const pontoRes = await client.query(
      `INSERT INTO pontos (nome, localizacao, foto, escolas_id, user_id, onibus_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      ['Ponto Central', 'Av. Principal, 100', null, null, 1, null]
    );
    console.log('Ponto inserido, id =', pontoRes.rows[0].id);

    // Validação rápida
    const counts = await client.query(`
      SELECT 
        (SELECT COUNT(*) FROM notificacoes) AS notificacoes,
        (SELECT COUNT(*) FROM pontos) AS pontos;
    `);
    console.log('Totais após inserção:', counts.rows[0]);
  } catch (err) {
    console.error('Erro ao inserir no Neon:', err);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main();