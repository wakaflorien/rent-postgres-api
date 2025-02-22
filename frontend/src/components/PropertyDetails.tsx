"use client";

import { workSans } from "@/utils/font";
import { Property } from "../types";
import { useState } from "react";
import { LuCalendar } from "react-icons/lu";
import { motion } from "motion/react";
import { variablesDiv, variablesBtn } from "@/utils/motion";
interface PropertyDetailsProps {
    property: Property;
}

export const PropertyDetails = ({ property }: PropertyDetailsProps) => {
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prev) =>
          prev === property.images.length - 1 ? 0 : prev + 1
        );
      };
    
      const previousImage = () => {
            setCurrentImageIndex((prev) =>
          prev === 0 ? property.images.length - 1 : prev - 1
        );
      };

    return (
        <div className={`max-w-7xl mx-auto p-6 ${workSans.variable} default-font`} {...variablesDiv}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Property Header */}
                <figure className="carousel-item relative h-96">
                    <img
                        src={property.images[currentImageIndex]}
                        alt={property.title}
                        className="w-full h-full object-cover"
                    />
                    <div className={`absolute flex ${currentImageIndex > 0 ? 'justify-between' : 'justify-end'} transform -translate-y-1/2 left-5 right-5 top-1/2`}>
                        {currentImageIndex > 0 && (<motion.button onClick={previousImage} className="btn btn-circle btn-sm bg-black/50 text-white border-none hover:bg-black/70" {...variablesBtn}>❮</motion.button>)}
                        {currentImageIndex < property.images.length - 1 && (<motion.button onClick={nextImage} className="btn btn-circle btn-sm bg-black/50 text-white border-none hover:bg-black/70" {...variablesBtn}>❯</motion.button>)}
                    </div>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                        {property.images.map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                </figure>

                {/* Property Info */}
                <div className="p-6">
                    <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
                    <div className="flex items-center mb-4">
                        <span className="text-xl font-semibold">Rwf {property.price}</span>
                        <span className="text-gray-500 ml-2">per night</span>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Description</h2>
                        <p className="text-gray-700">{property.description}</p>
                    </div>

                    {/* Property Details */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <h3 className="font-semibold">Location</h3>
                            <p className="text-gray-700">{property.location}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Bedrooms</h3>
                            <p className="text-gray-700">1</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <h3 className="font-semibold">Amenities</h3>
                            <p className="text-gray-700">{property.amenities.join(', ')}</p>
                        </div>
                        
                    </div>

                    {/* Booking Section */}
                    <div className="border-t pt-6">
                        <h2 className="text-xl font-semibold mb-4">Book Your Stay</h2>
                        <div className="flex gap-4 mb-4">
                            <label className="w-full bg-white input input-bordered input-md !text-black flex items-center gap-2">
                                <input
                                    type={"date"}
                                    placeholder="Check-in"
                                    className="grow"
                                    id="checkInDate"
                                    name="checkInDate"
                                    autoComplete="checkInDate"
                                    value={checkInDate}
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={(e) => setCheckInDate(e.target.value)}
                                    required
                                />
                                <LuCalendar />
                            </label>
                            <label className="w-full bg-white input input-bordered input-md !text-black flex items-center gap-2">
                                <input
                                    type="date"
                                    className="grow"
                                    placeholder="Check-out"
                                    min={checkInDate ? new Date(new Date(checkInDate).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                                    value={checkOutDate}
                                    onChange={(e) => setCheckOutDate(e.target.value)}
                                    required
                                />
                                <LuCalendar />
                            </label>
                            <motion.button className="primary-btn" {...variablesBtn}>
                                Book Now
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 