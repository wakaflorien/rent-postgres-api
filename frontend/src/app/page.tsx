"use client";

import React, { useState } from 'react';
import { Property } from '../types';
import { Navbar } from '../components/Navbar';
import { workSans } from '../utils/font';
import { PropertyList } from "@/components/PropertyList";
import { LuSearch } from "react-icons/lu";

export const SAMPLE_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Cozy Mountain Cabin',
    description: 'Beautiful cabin with mountain views',
    price: 150,
    location: 'Boulder, CO',
    images: ['https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp', 'https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp', 'https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp'],
    amenities: ['Wifi', 'Kitchen', 'Parking'],
    hostId: 'host1',
    rating: 4.5,
    reviews: [],
    available: true,
  },
  {
    id: '2',
    title: 'Modern Apartment',
    description: 'Spacious apartment with modern amenities',
    price: 200,
    location: 'San Francisco, CA',
    images: ['https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp', 'https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp', 'https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp'],
    amenities: ['Wifi', 'Kitchen', 'Parking'],
    hostId: 'host2',
    rating: 4.2,
    reviews: [],
    available: true,
  },
  {
    id: '3',
    title: 'Cozy Mountain Cabin',
    description: 'Beautiful cabin with mountain views',
    price: 150,
    location: 'Boulder, CO',
    images: ['https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp', 'https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp', 'https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp'],
    amenities: ['Wifi', 'Kitchen', 'Parking'],
    hostId: 'host3',
    rating: 4.5,
    reviews: [],
    available: true,
  },
];

export default function Home() {
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    console.log(search);
  };

  return (
    <div className={`${workSans.variable} default-font`}>
      <Navbar />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start container py-8 px-8 mx-auto">
        <header className="w-full flex flex-col justify-center items-center mb-8">
          <h1 className="text-3xl font-bold">Where do you want to stay?</h1>
          <p className="text-gray-600">Find the perfect place to stay for your next adventure.</p>
        </header>

        <label className="w-full bg-white input input-bordered input-md !text-black flex items-center gap-2">
          <input
            type={"text"}
            placeholder="Search"
            className="grow"
            id="search"
            name="search"
            autoComplete="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            required
          />
          <button type="button" className="size-4 cursor-pointer" onClick={handleSearch}>
            <LuSearch />
          </button>
        </label>

        <PropertyList properties={SAMPLE_PROPERTIES} />

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p>&copy; 2025 Lala Rentals</p>
      </footer>
    </div>
  );
}
