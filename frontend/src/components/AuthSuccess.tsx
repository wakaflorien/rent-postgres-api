"use client";

import React, { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLocalStorage } from '@/hooks';
import { setupAxiosAuth } from '@/utils/auth';

const AuthSuccess = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

  const [token, setToken] = useLocalStorage('token', '');
  
  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setToken(token);
      setupAxiosAuth(token);
      router.push('/dashboard');
    } else {
      router.push('/');
    }
  }, [searchParams, router, setToken]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Authentication Successful</h2>
        <p>Redirecting...</p>
      </div>
    </div>
  );
};

export default AuthSuccess;
