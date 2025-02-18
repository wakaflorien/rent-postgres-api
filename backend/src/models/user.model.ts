import { Pool } from 'pg';
import { v4 as uuidv4 } from 'uuid';
import { pool  as db } from '../db/index';

export enum UserRole {
    RENTER = 'renter',
    HOST = 'host',
    ADMIN = 'admin'
}
export interface User {
    id?: string;
    google_id: string;
    email: string;
    display_name: string;
    created_at: Date;
    role: UserRole;
}

export class UserModel {

static async create({ google_id, email, display_name, role }: Omit<User, 'id' | 'created_at'>): Promise<User> {
    const query = `
    INSERT INTO users (id, google_id, email, display_name, role)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `;
    const values = [uuidv4(), google_id, email, display_name, role];
    const result = await db.query(query, values);
    return result.rows[0];
}

static async findById(id: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0] || null;
}

static async findByGoogleId(googleId: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE google_id = $1';
    const result = await db.query(query, [googleId]);
    return result.rows[0] || null;
}
}

// Create users table if it doesn't exist
export const createUsersTable = async (pool: Pool) => {
const query = `
    CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    google_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
`;
await pool.query(query);
};


