'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux'; // Ensure useDispatch is imported
import { auth } from '@/firebase/config';
import { clearCart } from '@/store/cartSlice';
import { ShoppingCartIcon } from '@heroicons/react/solid';

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch(); // Initialize useDispatch
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const [user, setUser] = useState({ username: null, photoURL: null });
  const [isMounted, setIsMounted] = useState(false); // Track if component is mounted

  useEffect(() => {
    setIsMounted(true);

    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser({
          username: user.displayName,
          photoURL: user.photoURL,
        });
      } else {
        setUser({ username: null, photoURL: null });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch(clearCart()); // Clear cart state when user logs out
      localStorage.removeItem('cartItems'); // Clear the cart from localStorage
      localStorage.removeItem('totalQuantity'); // Clear total quantity from localStorage
      router.push('/'); // Redirect to the login page (assuming login page is at '/')
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!isMounted) return null; // Avoid rendering on the server

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        {user.photoURL && (
          <img src={user.photoURL} alt="User Avatar" className="rounded-full h-8 w-8 mr-2" />
        )}
        <span>{user.username}</span>
      </div>
      <div className="flex-1 flex justify-center">
        <h1 className="text-2xl font-bold">Your Store</h1>
      </div>
      <div className="flex items-center">
        <div className="relative cursor-pointer" onClick={() => router.push('/cart')}>
          <ShoppingCartIcon className="h-8 w-8 text-gray-800" />
          {totalQuantity > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {totalQuantity}
            </span>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
