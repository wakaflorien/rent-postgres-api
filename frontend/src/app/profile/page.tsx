import { Navbar } from "@/components/Navbar";

export default function ProfilePage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-2xl font-bold">Profile</h1>
            </div>
        </main>
    );
}