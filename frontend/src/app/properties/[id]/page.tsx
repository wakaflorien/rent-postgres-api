import { PropertyDetails } from "@/components/PropertyDetails";
import { Property } from "@/types";
import { Navbar } from "@/components/Navbar";
// This is a placeholder for your actual data fetching function
async function getProperty(id: string): Promise<Property> {
    // Replace this with your actual API call
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/properties/${id}`, {
        cache: 'no-store'  // or 'force-cache' if you want to cache the result
    });

    if (!response.ok) {
        throw new Error('Failed to fetch property');
    }

    return response.json();
}

interface PropertyPageProps {
    params: {
        id: string;
    };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
    //   const property = await getProperty(params.id);

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />
            <PropertyDetails property={{
                id: "1",
                title: "Property 1",
                description: "Description 1",
                location: "Location 1",
                images: ["https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp", "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp", "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"],
                price: 100,
                amenities: ["Amenity 1", "Amenity 2"],
                hostId: "1",
                rating: 4.5,
                reviews: [
                    { id: "1", rating: 5, comment: "Great property!", userId: "1", date: new Date().toISOString() },
                ],
                available: true,
            }} />
        </main>
    );
}

// Optionally, add error handling
export function ErrorBoundary({ error }: { error: Error }) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-red-600">Error</h1>
                <p className="text-gray-600">{error.message}</p>
            </div>
        </div>
    );
} 