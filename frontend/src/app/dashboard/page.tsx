"use client";
import React, { useState } from 'react'
import { workSans } from '@/utils/font'
import { LuSearch, LuPlus } from 'react-icons/lu'
import { Navbar } from '@/components/Navbar'
import { PropertyList } from '@/components/PropertyList'
import { motion } from 'motion/react'
import { PropertyPost } from '@/@types'
import { useFetch, useLocalStorage } from '@/hooks';
import BookingList from '@/components/BookingList';
import { SAMPLE_PROPERTIES } from '../page';

export default function Dashboard() {
    const [search, setSearch] = useState('');
    const [showAddProperty, setShowAddProperty] = useState(false);
    const [property, setProperty] = useState<PropertyPost>({
        title: '',
        description: '',
        price: 0,
        location: '',
        property_type: '',
        image_url: '',
        host_id: 'JQbUJITMdA/tGBchrAwqXwZxmKXukoM9IKTQRTFovgg',
    });

    const { data, loading, error } = useFetch('http://localhost:3001/api/v1/property/getAll');
    const [name, setName] = useLocalStorage('name', 'Guest');

    console.log(data, loading, error, "Fetched properties");

    const handleSearch = () => {
        console.log(search);
    };

    const handleAddPropertyFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProperty({ ...property, [e.target.name]: e.target.value });
    };

    const handleAddProperty = () => {
        console.log(property);
    };

    const handleCancel = () => {
        setShowAddProperty(false);
        setProperty({
            ...property,
            title: '',
            description: '',
            price: 0,
            location: '',
            property_type: '',
            image_url: '',
        });
    };

    const bookings = [{
        property_name: "APN",
        location: "KK 509 st8",
        price: "10290",
        check_in: "N/A",
        check_out: "N/A",
        property_type: "Motel",
        status: "pending"
    }]

    // if(!token){
    //     router.push("/")
    // }

    return (
        <div className={` ${workSans.variable} min-h-screen max-w-7xl container mx-auto default-font`}>
            <Navbar />
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start container py-8 px-8 mx-auto">
                <header className="w-full flex flex-col justify-center items-center mb-8">
                    <h1 className="text-3xl font-bold">Where do you want to stay?</h1>
                    <p className="text-gray-600">Find the perfect place to stay for great prices.</p>
                </header>


                <motion.div className="w-full bg-white input input-bordered input-md !text-black flex items-center gap-2" initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
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
                </motion.div>

                <motion.div className="w-full flex flex-row gap-4 justify-between" initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <motion.button type="button" className="primary-btn" onClick={() => setShowAddProperty(!showAddProperty)}><LuPlus /> Add Property</motion.button>
                </motion.div>

                {!showAddProperty ? (
                    <div role="tablist" className="tabs tabs-bordered">
                        <input type="radio" name="my_tabs_2" role="tab" className="tab !text-secondary font-bold" aria-label="Properties" defaultChecked />
                        <div role="tabpanel" className="tab-content bg-white border-none rounded-box">
                            <PropertyList properties={SAMPLE_PROPERTIES} />
                        </div>

                        <input type="radio" name="my_tabs_2" role="tab" className="tab !text-secondary  font-bold" aria-label="Bookings" />
                        <div role="tabpanel" className="tab-content bg-white border-none rounded-box">
                            <BookingList bookings={bookings} />
                        </div>
                    </div>
                ) : (
                    <div className="w-full flex flex-col gap-2">
                        <header className="w-full flex flex-col items-center gap-2">
                            <h1 className="text-3xl font-bold">Add Property</h1>
                            <p className="text-gray-600">Add a new property to your dashboard.</p>
                        </header>

                        <form className="w-full flex flex-col gap-4 bg-gray-100/20 border border-gray-100/50 items-center justify-center p-8 rounded-lg">

                            <div className="w-full flex flex-col gap-2">
                                <label htmlFor="title" className="text-sm">Property Name</label>
                                <input type="text" name='title' placeholder="Enter property title" className=" bg-white input input-bordered input-md !text-black" onChange={handleAddPropertyFormChange} />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <label htmlFor="description" className="text-sm">Property Description</label>
                                <input type="text" name='description' placeholder="Enter property description" className=" bg-white input input-bordered input-md !text-black" onChange={handleAddPropertyFormChange} />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <label htmlFor="price" className="text-sm">Property Price</label>
                                <input type="number" name='price' min={0} placeholder="Enter property price" className=" bg-white input input-bordered input-md !text-black" onChange={handleAddPropertyFormChange} />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <label htmlFor="location" className="text-sm">Property Location</label>
                                <input type="text" name='location' placeholder="Enter property location" className=" bg-white input input-bordered input-md !text-black" onChange={handleAddPropertyFormChange} />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <label htmlFor="property_type" className="text-sm">Property Type</label>
                                <input type="text" name='property_type' placeholder="Enter property type" className=" bg-white input input-bordered input-md !text-black" onChange={handleAddPropertyFormChange} />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <label htmlFor="image_url" className="text-sm">Property Image URL</label>
                                <input type="text" name='image_url' placeholder="Enter property image url" className=" bg-white input input-bordered input-md !text-black" onChange={handleAddPropertyFormChange} />
                            </div>

                            <motion.div className="w-full flex flex-row gap-2 items-center justify-center mt-4" initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                                <motion.button type="button" className="secondary-btn" onClick={handleCancel} initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>Cancel</motion.button>
                                <motion.button type="button" className="primary-btn" onClick={handleAddProperty} initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>Add Property</motion.button>
                            </motion.div>
                        </form>
                    </div>
                )}


            </main>
        </div>
    )
}
