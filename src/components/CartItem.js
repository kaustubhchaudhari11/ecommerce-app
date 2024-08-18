import React from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart, removeItemFromCart, decreaseItemQuantity } from '@/store/cartSlice';
import { formatCurrency } from '@/utils/formatCurrency';
import Button from './Button';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncreaseQuantity = () => {
    dispatch(addItemToCart(item));
  };

  const handleDecreaseQuantity = () => {
    dispatch(decreaseItemQuantity(item));
  };

  const handleRemoveItem = () => {
    dispatch(removeItemFromCart(item.id));
  };

  return (
    <div className="flex justify-between items-center p-4 border rounded-lg shadow">
      <img src={item.thumbnail} alt={item.name} className="w-24 h-24 object-cover rounded" />
      <div className="flex-1 ml-4">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-600">
          Price: {formatCurrency(item.price)}
          <br />
          Quantity: {item.quantity}
        </p>
        <div className="flex items-center mt-2">
          <Button onClick={handleDecreaseQuantity} className="px-2 py-1 bg-gray-300 text-gray-800 rounded">
            -
          </Button>
          <span className="mx-2">{item.quantity}</span>
          <Button onClick={handleIncreaseQuantity} className="px-2 py-1 bg-gray-300 text-gray-800 rounded">
            +
          </Button>
        </div>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold">Total: {formatCurrency(item.totalPrice)}</p>
        <Button onClick={handleRemoveItem} className="mt-2 text-red-500 hover:underline">
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CartItem;