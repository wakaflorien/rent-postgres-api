import { motion } from 'motion/react';
import React from 'react';
import { LuCalendarDays, LuMapPin, LuMapPinHouse } from 'react-icons/lu';
import {  variablesBtn } from '@/utils/motion';
import BookingDetails from './BookingDetails';


const BookingList = ({ bookings }: { bookings: unknown[] }) => {

    if (bookings.length === 0) {
        return (
            <div className="flex flex-col gap-2 p-6">
                <p className="text-gray-600">No bookings found.</p>
            </div>
        );
    }

    return (
        <>
            <div className="drawer drawer-end">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <div className="flex flex-col gap-4 p-6">
                        {bookings.map((booking, index) => (
                            <div key={index} className="card shadow-lg border">
                                <div className="card-body p-4">
                                    <div className="flex justify-between items-start">
                                        <div className="flex flex-col">
                                            <h3 className="card-title text-lg">{booking.property_name}</h3>
                                            <div className="flex items-center gap-1 text-gray-600 text-sm">
                                                <LuMapPin size={14} />
                                                <span>{booking.location}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-primary font-semibold">
                                            <span>{booking.price}</span>
                                            Rwf
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-4 mt-3">
                                        <div className="flex items-center gap-2 text-sm">
                                            <LuCalendarDays size={16} className="text-gray-600" />
                                            <div className="flex gap-1">
                                                <span className="font-medium">Check-in:</span>
                                                <span className="text-gray-600">{booking.check_in}</span>
                                            </div>
                                            <span className="text-gray-400">→</span>
                                            <div className="flex gap-1">
                                                <span className="font-medium">Check-out:</span>
                                                <span className="text-gray-600">{booking.check_out}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm">
                                            <LuMapPinHouse size={16} className="text-gray-600" />
                                            <div className="flex gap-1">
                                                <span className="font-medium">Property Type:</span>
                                                <span className="text-gray-600">{booking.property_type}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 mt-2">
                                            <div className={`badge ${booking.status === 'confirmed' ? 'badge-success' :
                                                booking.status === 'pending' ? 'badge-warning' :
                                                    'badge-error'
                                                } gap-2 capitalize`}>
                                                {booking.status}
                                            </div>
                                        </div>
                                        <motion.label htmlFor="my-drawer-4" className="drawer-button btn !btn-sm btn-primary secondary-btn" {...variablesBtn}>View Details</motion.label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    
                    {/* Drawer content  */}
                    <BookingDetails booking={bookings[0]} />
                </div>
            </div>
        </>
    );
};

export default BookingList;