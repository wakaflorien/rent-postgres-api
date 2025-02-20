import { workSans } from "@/utils/font";

export default function NotFound() {
    return (
        <div className={`${workSans.variable} default-font flex flex-col items-center justify-center h-screen`}>
            <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
        </div>
    );
}