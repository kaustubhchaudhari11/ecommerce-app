// src/app/page.js
'use client'
import React from 'react';
import GoogleSignIn from '@/components/GoogleSignIn';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/dashboard');
  };


  //Login using GoogleSignin-Firebase
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <GoogleSignIn onSignIn={handleSignIn} /> 
    </div>
  );
}
