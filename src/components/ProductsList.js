// src/components/ProductList.js
'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '@/store/cartSlice';
import Modal from 'react-modal';
import { formatCurrency } from '@/utils/formatCurrency';


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(addItemToCart(selectedProduct));
      closeModal();
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded shadow-lg">
          <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover mb-4" />
          <h3 className="text-xl font-semibold">{product.title}</h3>
          <p className="text-lg font-semibold mb-2">{formatCurrency(product.price)}</p>
          <button
            className="mt-4 p-2 bg-blue-500 text-white rounded"
            onClick={() => openModal(product)}
          >
            Add to Cart
          </button>
        </div>
      ))}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Add to Cart"
        ariaHideApp={false}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-xl font-bold mb-4">Are you sure you want to add this product to the cart?</h2>
        <button onClick={handleAddToCart} className="p-2 bg-green-500 text-white rounded mr-2">
          Yes
        </button>
        <button onClick={closeModal} className="p-2 bg-red-500 text-white rounded">
          No
        </button>
      </Modal>
    </div>
  );
};

export default ProductList;
