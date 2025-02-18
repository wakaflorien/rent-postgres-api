import { Pool } from 'pg';

export const pool = new Pool({
user: process.env.DB_USER || 'postgres',
password: process.env.DB_PASSWORD || 'waka123',
host: process.env.DB_HOST || 'localhost',
port: parseInt(process.env.DB_PORT || '5432'),
database: process.env.DB_NAME || 'postgres'
});

pool.on('error', (err) => {
console.error('Unexpected error on idle client', err);
process.exit(-1);
});