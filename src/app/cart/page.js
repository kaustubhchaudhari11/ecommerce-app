// src/app/cart/page.js
'use client';

import React, { useState,useEffect  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { clearCart } from '@/store/cartSlice';
import { formatCurrency } from '@/utils/formatCurrency';


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

  const handleIncreaseQuantity = (item) => {
    dispatch(addItemToCart(item));
  };

  const handleDecreaseQuantity = (item) => {
    dispatch(decreaseItemQuantity(item));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItemFromCart(itemId));
  };

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
              <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg shadow">
                <img src={item.thumbnail} alt={item.name} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1 ml-4">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    Price: {formatCurrency(item.price)}
                    <br />
                    Quantity: {item.quantity}
                  </p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleDecreaseQuantity(item)}
                      className="px-2 py-1 bg-gray-300 text-gray-800 rounded"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => handleIncreaseQuantity(item)}
                      className="px-2 py-1 bg-gray-300 text-gray-800 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                <p className="text-lg font-semibold">Total: {formatCurrency(item.totalPrice)}</p>
                <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="mt-2 text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 border rounded-lg shadow">
            <h3 className="text-xl font-bold">Cart Summary</h3>
            <p className="text-lg mt-2">Subtotal: {formatCurrency(subtotal)}</p>
            <p className="text-lg mt-2 text-green-600">Discount: -{formatCurrency(totalDiscount)} (Total 10 INR off)</p>
            <p className="text-lg mt-2 font-semibold">Total: {formatCurrency(totalPrice)}</p>
            <button
              onClick={handleCheckout}
              className="mt-4 w-full py-2 bg-blue-500 text-white rounded"
            >
              Checkout
            </button>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Checkout Successful!</h2>
            <p className="text-lg mb-4">Your items have been successfully purchased.</p>
            <div className="flex justify-center">
              <button
                onClick={handleBackToDashboard}
                className="mr-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Back to Dashboard
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
