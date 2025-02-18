import { Pool } from "pg";
import { v4 as uuidv4 } from "uuid";
import { pool as db } from "../db/index";

export enum BookingStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELED = "canceled",
}

export interface Booking {
  id: string;
  property_id: string;
  renter_id: string;
  check_in_date: Date;
  check_out_date: Date;
  status: BookingStatus;
  total_price: number;
  created_at: Date;
}

export class Booking {
  static async findAll(): Promise<Booking[] | null> {
    const query = "SELECT * FROM bookings";
    const result = await db.query(query);
    return result.rows || null;
  }
  static async create(booking: Booking): Promise<Booking> {
    // Check for booking conflicts before creating
    const hasConflict = await this.hasConflict(
      booking.property_id,
      booking.check_in_date,
      booking.check_out_date
    );

    if (hasConflict) {
      throw new Error("Booking dates conflict with existing reservation");
    }

    const query = `
            INSERT INTO bookings (id, property_id, renter_id, check_in_date, check_out_date, status, total_price, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;

    const values = [
      uuidv4(),
      booking.property_id,
      booking.renter_id,
      booking.check_in_date,
      booking.check_out_date,
      booking.status,
      booking.total_price,
      new Date(),
    ];

    const result = await db.query(query, values);
    return result.rows[0] || null;
  }

  static async findById(id: string): Promise<Booking | null> {
    const query = `
            SELECT * FROM bookings
            WHERE id = $1;
        `;
    const result = await db.query(query, [id]);
    return result.rows[0] || null;
  }

  static async findByPropertyId(propertyId: string): Promise<Booking[] | null> {
    const query = `
            SELECT * FROM bookings
            WHERE property_id = $1
            ORDER BY check_in_date;
        `;

    const result = await db.query(query, [propertyId]);
    return result.rows || null;
  }

  static async findByRenterId(renterId: string): Promise<Booking[] | null> {
    const query = `
            SELECT * FROM bookings
            WHERE renter_id = $1
            ORDER BY created_at DESC;
        `;

    const result = await db.query(query, [renterId]);
    return result.rows || null;
  }

  static async updateStatus(
    bookingId: string,
    status: BookingStatus
  ): Promise<Booking | null> {
    const query = `
            UPDATE bookings
            SET status = $1
            WHERE id = $2
            RETURNING *;
        `;

    const result = await db.query(query, [status, bookingId]);

    if (result.rows.length === 0) {
      throw new Error("Booking not found");
    }

    return result.rows[0] || null;
  }

  static async hasConflict(
    propertyId: string,
    checkInDate: Date,
    checkOutDate: Date
  ): Promise<boolean> {
    const query = `
            SELECT EXISTS (
                SELECT 1 FROM bookings
                WHERE property_id = $1
                AND status = 'confirmed'
                AND (
                    (check_in_date <= $2 AND check_out_date > $2)
                    OR (check_in_date < $3 AND check_out_date >= $3)
                    OR (check_in_date >= $2 AND check_out_date <= $3)
                )
            ) as has_conflict;
        `;

    const result = await db.query(query, [
      propertyId,
      checkInDate,
      checkOutDate,
    ]);
    return result.rows[0].has_conflict;
  }

  static async deleteBooking(bookingId: string): Promise<void> {
    const query = `
            DELETE FROM bookings
            WHERE id = $1;
        `;

    await db.query(query, [bookingId]);
  }
}

export const createBookingsTable = async (pool: Pool) => {
  const query = `
        CREATE TABLE IF NOT EXISTS bookings (
            id UUID PRIMARY KEY,
            property_id UUID NOT NULL REFERENCES properties(id),
            renter_id UUID NOT NULL REFERENCES users(id),
            check_in_date DATE NOT NULL,
            check_out_date DATE NOT NULL,
            status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'confirmed', 'canceled')),
            total_price DECIMAL(10,2) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT check_dates CHECK (check_out_date > check_in_date)
        );
        
        CREATE INDEX IF NOT EXISTS idx_bookings_property_id ON bookings(property_id);
        CREATE INDEX IF NOT EXISTS idx_bookings_renter_id ON bookings(renter_id);
    `;

  await pool.query(query);
};
