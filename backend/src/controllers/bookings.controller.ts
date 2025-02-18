import { Request, Response } from "express";
import { Booking, BookingStatus } from "../models/booking.model";
import { v4 as uuidv4 } from "uuid";
import Joi from "joi";


const bookingSchema = Joi.object({
    property_id: Joi.string().required(),
    renter_id: Joi.string().required(),
    check_in_date: Joi.date().required(),
    check_out_date: Joi.date().required(),
});

export const createBooking = async (req: Request, res: Response) => {
    const { property_id, renter_id, check_in_date, check_out_date } = req.body;
    const { error } = bookingSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message, data: null, status: "failed" });
    }
    const booking = await Booking.create({ id: uuidv4(), property_id, renter_id, check_in_date, check_out_date, status: BookingStatus.PENDING, total_price: 0, created_at: new Date() });
    res.status(201).json({ message: "Booking created successfully", data: booking, status: "success" });
}

export const getBookingsByRenterId = async (req: Request, res: Response) => {
    const { renter_id } = req.params;
    const bookings = await Booking.findByRenterId(renter_id);
    res.status(200).json({ message: "Bookings fetched successfully", data: bookings, status: "success" });
}

export const getBookingsByPropertyId = async (req: Request, res: Response) => {
    const { property_id } = req.params;
    const bookings = await Booking.findByPropertyId(property_id);
    res.status(200).json({ message: "Bookings fetched successfully", data: bookings, status: "success" });
}

export const updateBookingStatus = async (req: Request, res: Response) => {
    const { booking_id } = req.params;
    const { status } = req.body;
    const booking = await Booking.updateStatus(booking_id, status);
    res.status(200).json({ message: "Booking status updated successfully", data: booking, status: "success" });
}

export const deleteBooking = async (req: Request, res: Response) => {
    const { booking_id } = req.params;
    await Booking.delete(booking_id);
    res.status(200).json({ message: "Booking deleted successfully", data: null, status: "success" });
}

export const getBookingsByHostId = async (req: Request, res: Response) => {
    const { host_id } = req.params;
    const bookings = await Booking.findByHostId(host_id);
    res.status(200).json({ message: "Bookings fetched successfully", data: bookings, status: "success" });
}

export const getBookingsByLocation = async (req: Request, res: Response) => {
    const { location } = req.params;
    const bookings = await Booking.findByLocation(location);
    res.status(200).json({ message: "Bookings fetched successfully", data: bookings, status: "success" });
}

export const getBookingsByDateRange = async (req: Request, res: Response) => {
    const { start_date, end_date } = req.params;
    const bookings = await Booking.findByDateRange(start_date, end_date);
    res.status(200).json({ message: "Bookings fetched successfully", data: bookings, status: "success" });
}