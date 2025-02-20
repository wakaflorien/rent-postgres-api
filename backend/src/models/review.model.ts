import { Pool } from "pg";
import { pool as db } from "../db/index";
import { v4 as uuidv4 } from "uuid";

export interface Review {
  id: string;
  property_id: string;
  renter_id: string;
  rating: number;
  comment: string;
  created_at: Date;
}

export class Review {
  static async findAll(): Promise<Review[] | null> {
    const query = "SELECT * FROM reviews";
    const result = await db.query(query);
    return result.rows || null;
  }

  static async create(review: Review): Promise<Review> {
    const query = `
      INSERT INTO reviews (id, property_id, renter_id, rating, comment, created_at)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *   
    `;

    const values = [
      uuidv4(),
      review.property_id,
      review.renter_id,
      review.rating,
      review.comment,
      new Date(),
    ];
    const result = await db.query(query, values);

    return result.rows[0];
  }

  static async findByPropertyId(propertyId: string): Promise<Review[] | null> {
    const query = "SELECT * FROM reviews WHERE property_id = $1";
    const result = await db.query(query, [propertyId]);
    return result.rows || null;
  }

  static async findByRenterId(renterId: string): Promise<Review[] | null> {
    const query = "SELECT * FROM reviews WHERE renter_id = $1";
    const result = await db.query(query, [renterId]);
    return result.rows || null;
  }

  static async update(id: string, review: Review): Promise<Review | null> {
    const query = `
      UPDATE reviews SET rating = $1, comment = $2 WHERE id = $3
      RETURNING *
    `;

    const result = await db.query(query, [
      review.rating,
      review.comment,
      id,
    ]);

    return result.rows[0] || null;
    }

  static async delete(id: string): Promise<void> {
    const query = "DELETE FROM reviews WHERE id = $1";
    await db.query(query, [id]);
  }

  static async getAverageRating(propertyId: string): Promise<number | null> {
    const query = `
      SELECT COALESCE(AVG(rating), 0) FROM reviews WHERE property_id = $1
    `;

    const result = await db.query(query, [propertyId]);
    return result.rows[0]?.avg_rating || null;
  }
}

export const createReviewTable = async (pool: Pool) => {
  const query = `
    CREATE TABLE IF NOT EXISTS reviews (
      id UUID PRIMARY KEY,
      property_id UUID NOT NULL REFERENCES properties(id),
      renter_id UUID NOT NULL REFERENCES users(id),
      rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
      comment TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

      CONSTRAINT check_rating CHECK (rating >= 1 AND rating <= 5)
    );

    CREATE INDEX IF NOT EXISTS idx_reviews_property_id ON reviews(property_id);
    CREATE INDEX IF NOT EXISTS idx_reviews_renter_id ON reviews(renter_id);
  `;

  await pool.query(query);
};
