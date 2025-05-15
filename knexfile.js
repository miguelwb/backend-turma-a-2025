export const development = {
    client: 'sqlite3',
    connection: {
        filename: './db/db.sqlite'
    },
    useNullAsDefault: true,
    migrations: {
        directory: './db/migrations'
    },
    seeds: {
        directory: './seeds'
    }
}