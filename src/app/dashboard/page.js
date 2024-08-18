// src/app/dashboard/page.js
'use client'
import React from 'react';
import Header from '@/components/Header';
import ProductList from '@/components/ProductsList';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Products</h2>
        <ProductList />
      </div>
    </div>
  );
}
