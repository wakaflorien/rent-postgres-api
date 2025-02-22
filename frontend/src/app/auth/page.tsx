"use client";

import { useState } from "react";
import Image from "next/image";
import { LuEye, LuEyeOff, LuHousePlug } from "react-icons/lu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { workSans } from "@/utils/font";
import Footer from "@/components/Footer";

export default function Home() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleLogin = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(formState);
    router.push("/dashboard");
  };

  return (
    <div className={` ${workSans.variable} auth-layout default-font`}>
      <main className="flex flex-col gap-8 sm:row-start-2 items-center sm:items-start">
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
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-white input input-bordered input-md text-black"
                id="email"
                name="email"
                autoComplete="email"
                value={formState.email}
                onChange={handleChange}
                required
              />
              {formState.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formState.email) && (
                <small className="text-error">Invalid email address</small>
              )}

              
              <div className="card-actions justify-center">
                <button type="submit" className="bg-secondary w-full btn btn-primary border-none text-white hover:bg-secondary/90" onClick={handleLogin}>Signin</button>
              </div>
              <small className="text-center"> <Link href="/forgot" className="text-secondary">Forgot password?</Link></small>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
