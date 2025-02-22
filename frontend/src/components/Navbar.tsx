"use client";

import { useRouter } from 'next/navigation';
import { workSans } from '@/utils/font';
import React from 'react';
import Link from 'next/link';
import { variablesDiv } from '@/utils/motion';
import { motion } from 'motion/react';

export const Navbar: React.FC = () => {
  const router = useRouter();
  return (
    <div className={`max-w-7xl mx-auto navbar rounded-box px-20 ${workSans.variable} default-font`}>
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl text-secondary">Lala Rentals</Link>
      </div>
      <div className="flex-none gap-2">

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <motion.div className="w-10 rounded-full border-2 border-secondary bg-secondary" {...variablesDiv}>
              {/* <img src="/api/placeholder/40/40" alt="profile" /> */}
            </motion.div>
          </label>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52">
            {/* <li><Link href="/profile">Profile</Link></li> */}
            <li><Link href="/auth">Login</Link></li>
            <li><a onClick={() => router.push('/')}>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};