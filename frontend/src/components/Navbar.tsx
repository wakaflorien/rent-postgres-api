import { workSans } from '@/utils/font';
import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <div className={`max-w-7xl mx-auto navbar rounded-box px-20 ${workSans.variable} default-font`}>
      <div className="flex-1">
        <a href="/" className="btn btn-ghost normal-case text-xl text-primary">Lala Rentals</a>
      </div>
      <div className="flex-none gap-2">
        
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full border-2 border-primary bg-primary">
              {/* <img src="/api/placeholder/40/40" alt="profile" /> */}
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52">
            <li><a>Profile</a></li>
            <li><a>My Bookings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};