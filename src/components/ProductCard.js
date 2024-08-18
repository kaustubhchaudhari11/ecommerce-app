// src/components/ProductCard.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '@/store/cartSlice';
import { formatCurrency } from '@/utils/formatCurrency';
import Button from './Button';

const ProductCard = ({ product, openModal }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItemToCart(product));
    openModal(product);
  };

  return (
    <div className="border p-4 rounded shadow-lg">
      <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover mb-4" />
      <h3 className="text-xl font-semibold">{product.title}</h3>
      <p className="text-lg font-semibold mb-2">{formatCurrency(product.price)}</p>
      <Button onClick={handleAddToCart} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
