import { Router } from 'express';

import { isAuthenticated } from '../middleware/auth.middleware';
import { getBookings, getBookingsByRenterId, updateBookingStatus, deleteBooking, createBooking } from '../controllers/bookings.controller';

const router = Router();

router.get('/', isAuthenticated, getBookings);
router.get('/:id', isAuthenticated, getBookingsByRenterId);
router.post('/', isAuthenticated, createBooking);
router.put('/:id', isAuthenticated, updateBookingStatus);
router.delete('/:id', isAuthenticated, deleteBooking);


export default router;