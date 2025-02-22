import React from 'react';
import { 
  LuCalendarDays, 
  LuMapPin, 
  LuDollarSign, 
  LuClock, 
  LuCreditCard,
  LuHouse
} from 'react-icons/lu';
import { variablesBtn } from '@/utils/motion';  
import { motion } from 'motion/react';

const BookingDetails = ({ booking }: { booking: unknown}) => {
  if (!booking) return null;

  return (
      <div className="max-w-xl w-full h-full bg-white p-4">
        <div className="flex items-start mb-4">
          <h2 className="text-2xl font-bold">{booking.property_name}</h2>
        </div>

        <div className="divider"></div>

        {/* Booking Status */}
        <div className="flex justify-between items-center mb-6">
          <div className={`badge ${
            booking.status === 'confirmed' ? 'badge-success' :
            booking.status === 'pending' ? 'badge-warning' :
            'badge-error'
          } gap-2 p-3`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </div>
          <span className="text-sm text-gray-500">Booking ID: {booking.id} </span>
        </div>

        {/* Main Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="card bg-none border cursor-pointer hover:bg-secondary/5">
              <div className="card-body p-4">
                <h3 className="card-title text-lg mb-2">Stay Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <LuCalendarDays size={16} className="text-primary" />
                    <div>
                      <p className="font-medium">Check-in</p>
                      <p className="text-sm text-gray-600">{booking.check_in}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <LuCalendarDays size={16} className="text-primary" />
                    <div>
                      <p className="font-medium">Check-out</p>
                      <p className="text-sm text-gray-600">{booking.check_out}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <LuClock size={16} className="text-primary" />
                    <div>
                      <p className="font-medium">Duration</p>
                      <p className="text-sm text-gray-600">{booking.duration} nights</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="card bg-none border cursor-pointer hover:bg-secondary/5">
              <div className="card-body p-4">
                <h3 className="card-title text-lg mb-2">Property Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <LuMapPin size={16} className="text-primary" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-gray-600">{booking.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <LuHouse size={16} className="text-primary" />
                    <div>
                      <p className="font-medium">Property Type</p>
                      <p className="text-sm text-gray-600">{booking.property_type}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-none border cursor-pointer hover:bg-secondary/5">
              <div className="card-body p-4">
                <h3 className="card-title text-lg mb-2">Payment Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <LuDollarSign size={16} className="text-primary" />
                    <div>
                      <p className="font-medium">Total Amount</p>
                      <p className="text-sm text-gray-600">${booking.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <LuCreditCard size={16} className="text-primary" />
                    <div>
                      <p className="font-medium">Payment Status</p>
                      <p className="text-sm text-gray-600">{booking.payment_status}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="modal-action mt-6 w-full flex justify-between">
          {booking.status === 'pending' && (
            <>
              <motion.button className="btn btn-error text-white" {...variablesBtn}>Cancel Booking</motion.button>
              <motion.button className="primary-btn" {...variablesBtn}>Confirm Booking</motion.button>
            </>
          )}
          {booking.status === 'confirmed' && (
            <button className="btn btn-error">Cancel Booking</button>
          )}
        </div>
      </div>
  );
};

export default BookingDetails;