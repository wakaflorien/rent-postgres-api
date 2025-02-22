"use client";

import { LuHousePlug, LuLogIn } from "react-icons/lu";
import { workSans } from "@/utils/font";
import Footer from "@/components/Footer";

export default function Home() {  

  const handleLogin = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = "http://localhost:3000/auth/google";
    // router.push("/dashboard");
  };

  return (
    <div className={` ${workSans.variable} auth-layout default-font min-h-screen`}>
      <main className="max-w-xl mx-auto min-h-screen flex flex-col gap-8 sm:row-start-2  justify-center items-center sm:items-start">
        <div className="card w-full border shadow-xl">
          <div className="card-body min-w-[500px] space-y-8">
            <header className="flex flex-col items-center space-y-8">
              <LuHousePlug className="text-primary size-16 stroke-1" />
              <div className="flex flex-col items-center">
                <h2 className="card-title">Welcome back!</h2>
                <p>Login into your account to continue</p>
              </div>
            </header>

            <form className="flex flex-col gap-4">
              
              <div className="card-actions justify-center">
                <button type="submit" className="bg-secondary w-full btn btn-primary border-none text-white hover:bg-secondary/90" onClick={handleLogin}>
                <LuLogIn className="text-white size-4" />
                Continue with Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
