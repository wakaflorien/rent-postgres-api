import { Request, Response } from "express";
import { Booking, BookingStatus } from "../models/booking.model";
import { v4 as uuidv4 } from "uuid";
import Joi from "joi";

const bookingSchema = Joi.object({
  property_id: Joi.string().required(),
  renter_id: Joi.string().required(),
  check_in_date: Joi.date().required(),
  check_out_date: Joi.date().required(),
  total_price: Joi.number().required(),
  status: Joi.string()
    .valid(
      BookingStatus.PENDING,
      BookingStatus.CONFIRMED,
      BookingStatus.CANCELED
    )
    .required(),
});

export const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.findAll();
    res.status(200).json({
      message: "Bookings fetched successfully",
      data: bookings,
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching bookings",
      data: null,
      status: "failed",
    });
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const { booking_id } = req.params;
    await Booking.deleteBooking(booking_id);
    res.status(200).json({
      message: "Booking deleted successfully",
      data: null,
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: (error as Error).message,
      data: null,
      status: "failed",
    });
  }
};

export const getBookingsByRenterId = async (req: Request, res: Response) => {
  try {
    const { renter_id } = req.params;
    const bookings = await Booking.findByRenterId(renter_id);
    res.status(200).json({
      message: "Available bookings",
      data: bookings,
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: (error as Error).message,
      data: null,
      status: "failed",
    });
  }
};

export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { booking_id } = req.params;
    const { status } = req.body;
    const booking = await Booking.updateStatus(booking_id, status);
    res.status(200).json({
      message: "Booking status updated successfully",
      data: booking,
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: (error as Error).message,
      data: null,
      status: "failed",
    });
  }
};

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { error } = bookingSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: error.message, data: null, status: "failed" });
    }
    const booking = await Booking.create(req.body);
    res.status(200).json({
      message: "Booking created successfully",
      data: booking,
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: (error as Error).message,
      data: null,
      status: "failed",
    });
  }
};
