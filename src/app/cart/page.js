'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { clearCart } from '@/store/cartSlice';
import { formatCurrency } from '@/utils/formatCurrency';
import CartItem from '@/components/CartItem';
import Button from '@/components/Button';
import CustomModal from '@/components/Modal';

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false); // Track if component is mounted

  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true); // Set mounted state to true after component mounts
  }, []);

  const totalDiscount = 10; // Total fixed discount of $10 for the entire cart

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // Calculate subtotal before discount
  const subtotal = cartItems.reduce((total, item) => total + item.totalPrice, 0);

  // Calculate total price after discount
  const totalPrice = subtotal - totalDiscount;

  const handleCheckout = () => {
    setIsModalOpen(true); // Show modal on checkout
    dispatch(clearCart()); // Clear the cart after checkout
  };

  const handleBackToDashboard = () => {
    setIsModalOpen(false);
    router.push('/dashboard'); // Redirect to the dashboard
  };

  if (!isMounted) return null; // Prevent rendering until the component is mounted

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Your Shopping Cart</h2>
      {cartItems.length > 0 ? (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-8 p-4 border rounded-lg shadow">
            <h3 className="text-xl font-bold">Cart Summary</h3>
            <p className="text-lg mt-2">Subtotal: {formatCurrency(subtotal)}</p>
            <p className="text-lg mt-2 text-green-600">Discount: -{formatCurrency(totalDiscount)} (Total 10 INR off)</p>
            <p className="text-lg mt-2 font-semibold">Total: {formatCurrency(totalPrice)}</p>
            <Button onClick={handleCheckout} className="mt-4 w-full py-2 bg-blue-500 text-white rounded">
              Checkout
            </Button>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}

      {/* Modal */}
      <CustomModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} contentLabel="Checkout Successful">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Checkout Successful!</h2>
        <p className="text-lg mb-4">Your items have been successfully purchased.</p>
        <div className="flex justify-center">
          <Button onClick={handleBackToDashboard} className="mr-4 px-4 py-2 bg-blue-500 text-white rounded">
            Back to Dashboard
          </Button>
          <Button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded">
            Close
          </Button>
        </div>
      </CustomModal>
    </div>
  );
};

export default CartPage;
