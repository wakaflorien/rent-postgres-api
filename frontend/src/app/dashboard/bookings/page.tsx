import { Navbar } from "@/components/Navbar";

export default function BookingsPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-2xl font-bold">Bookings</h1>
            </div>
        </main>
    );
}