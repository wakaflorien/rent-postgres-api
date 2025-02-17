import { Pool } from "pg";
import { v4 as uuidv4 } from "uuid";
import { pool as db } from "../db/index";

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  property_type?: string;
  image_url: string;
  host_id: string;
  created_at: Date;
}
export class Property {
  static async create(property: Property): Promise<Property> {
    const query = `
            INSERT INTO properties (id, title, description, price, location, property_type, image_url, host_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `;
    const values = [
      uuidv4(),
      property.title,
      property.description,
      property.price,
      property.location,
      property.property_type,
      property.image_url,
      property.host_id,
    ];
    const result = await db.query(query, values);
    return result.rows[0];
  }
  static async findAll(): Promise<Property[] | null> {
    const query = "SELECT * FROM properties";
    const result = await db.query(query);
    return result.rows || null;
  }
  
  static async findById(id: string): Promise<Property | null> {
    const query = "SELECT * FROM properties WHERE id = $1";
    const result = await db.query(query, [id]);
    return result.rows[0] || null;
  }

  static async findByHostId(host_id: string): Promise<Property[] | null> {
    const query = "SELECT * FROM properties WHERE host_id = $1";
    const result = await db.query(query, [host_id]);
    return result.rows || null;
  }

  static async update(id: string, property: Property): Promise<Property | null> {
    const query = "UPDATE properties SET title = $1, description = $2, price = $3, location = $4, property_type = $5, image_url = $6 WHERE id = $7 RETURNING *";
    const values = [property.title, property.description, property.price, property.location, property.property_type, property.image_url, id];
    const result = await db.query(query, values);
    return result.rows[0] || null;
  } 

  static async delete(id: string): Promise<void> {
    const query = "DELETE FROM properties WHERE id = $1";
    await db.query(query, [id]);
  } 

  static async findByLocation(location: string): Promise<Property[] | null> {
    const query = "SELECT * FROM properties WHERE location = $1";
    const result = await db.query(query, [location]);
    return result.rows || null;
  }
}

export const createPropertiesTable = async (pool: Pool) => {
  const query = `
    CREATE TABLE IF NOT EXISTS properties (
      id UUID PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      location VARCHAR(255) NOT NULL,
      property_type VARCHAR(255),
      image_url VARCHAR(255) NOT NULL,
      host_id VARCHAR(255) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await pool.query(query);
};
