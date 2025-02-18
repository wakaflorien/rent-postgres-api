import { Router } from 'express';

import { isAuthenticated, isHost, isRenter } from '../middleware/auth.middleware';
import { getBookings, getBookingsByRenterId, updateBookingStatus, deleteBooking, createBooking } from '../controllers/bookings.controller';

const router = Router();

router.get('/', isAuthenticated, isHost, getBookings);
router.get('/:id', isAuthenticated, isRenter, getBookingsByRenterId);
router.post('/', isAuthenticated, isHost, createBooking);
router.put('/:id', isAuthenticated, isHost, updateBookingStatus);
router.delete('/:id', isAuthenticated, isHost, deleteBooking);


export default router;