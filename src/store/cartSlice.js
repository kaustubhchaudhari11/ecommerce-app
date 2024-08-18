import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: typeof window !== 'undefined' && localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  totalQuantity: typeof window !== 'undefined' && localStorage.getItem('totalQuantity')
    ? parseInt(localStorage.getItem('totalQuantity'), 10)
    : 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        state.items.push({
          id: newItem.id,
          name: newItem.title,
          price: newItem.price,
          thumbnail: newItem.thumbnail,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }
      state.totalQuantity++;

      localStorage.setItem('cartItems', JSON.stringify(state.items));
      localStorage.setItem('totalQuantity', state.totalQuantity.toString());
    },
    decreaseItemQuantity(state, action) {
      const item = action.payload;
      const existingItem = state.items.find(cartItem => cartItem.id === item.id);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
        existingItem.totalPrice -= item.price;
      } else if (existingItem) {
        state.items = state.items.filter(cartItem => cartItem.id !== item.id);
      }

      state.totalQuantity--;

      localStorage.setItem('cartItems', JSON.stringify(state.items));
      localStorage.setItem('totalQuantity', state.totalQuantity.toString());
    },
    removeItemFromCart(state, action) {
      const itemId = action.payload;
      const existingItem = state.items.find(item => item.id === itemId);

      if (existingItem) {
        state.items = state.items.filter(item => item.id !== itemId);
        state.totalQuantity -= existingItem.quantity;
      }

      localStorage.setItem('cartItems', JSON.stringify(state.items));
      localStorage.setItem('totalQuantity', state.totalQuantity.toString());
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      localStorage.removeItem('cartItems');
      localStorage.removeItem('totalQuantity');
    },
  },
});

export const {
  addItemToCart,
  decreaseItemQuantity,
  removeItemFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
