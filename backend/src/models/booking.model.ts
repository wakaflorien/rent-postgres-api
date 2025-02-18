import { Pool } from 'pg';
import { v4 as uuidv4 } from 'uuid';

export enum BookingStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    CANCELED = 'canceled'
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
  
    async create(booking: Omit<Booking, 'id' | 'created_at'>): Promise<Booking> {
        // Check for booking conflicts before creating
        const hasConflict = await this.hasBookingConflict(
            booking.property_id,
            booking.check_in_date,
            booking.check_out_date
        );

        if (hasConflict) {
            throw new Error('Booking dates conflict with existing reservation');
        }

        const query = `
            INSERT INTO bookings (id, property_id, renter_id, check_in_date, check_out_date, status, total_price)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `;

        const values = [
            uuidv4(),
            booking.property_id,
            booking.renter_id,
            booking.check_in_date,
            booking.check_out_date,
            booking.status,
            booking.total_price
        ];

        const result = await this.pool.query(query, values);
        return result.rows[0];
    }

    async findByPropertyId(propertyId: string): Promise<Booking[]> {
        const query = `
            SELECT * FROM bookings
            WHERE property_id = $1
            ORDER BY check_in_date;
        `;

        const result = await this.pool.query(query, [propertyId]);
        return result.rows;
    }

    async findByRenterId(renterId: string): Promise<Booking[]> {
        const query = `
            SELECT * FROM bookings
            WHERE renter_id = $1
            ORDER BY created_at DESC;
        `;

        const result = await this.pool.query(query, [renterId]);
        return result.rows;
    }

    async updateStatus(bookingId: string, status: BookingStatus): Promise<Booking> {
        const query = `
            UPDATE bookings
            SET status = $1
            WHERE id = $2
            RETURNING *;
        `;

        const result = await this.pool.query(query, [status, bookingId]);
        
        if (result.rows.length === 0) {
            throw new Error('Booking not found');
        }

        return result.rows[0];
    }

    async hasBookingConflict(
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

        const result = await this.pool.query(query, [propertyId, checkInDate, checkOutDate]);
        return result.rows[0].has_conflict;
    }
}

export const createBookingsTable = async (pool: Pool): Promise<void> => {
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
}

