import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  totalPrice: 0,
};

// Calculate total price of cart items
const calcTotalPrice = (cartItems) => {
  let total = 0;
  cartItems.forEach(item => { 
    total += item.quantity * item.price;
  });
  return total;
};

// Add item to cart
const addToCart = (state, action) => {
  const id = action.payload.id;
  state.cartItems = state.cartItems.map(item => { 
    if (item.id === id) return { ...item, quantity: item.quantity + 1 };
    return item;
  });
  const found = state.cartItems.some(item => item.id === id);
  if (!found) {
    state.cartItems.push({ ...action.payload, quantity: 1 });
  }
  state.totalPrice = calcTotalPrice(state.cartItems);
};

// Update item quantity in cart
const updateQuantity = (state, action) => {
  const id = action.payload.id;
  state.cartItems = state.cartItems.map(item => 
    item.id === id ? { ...item, quantity: action.payload.quantity } : item
  );
  state.totalPrice = calcTotalPrice(state.cartItems);
};

// Remove item from cart
const removeFromCart = (state, action) => {
  const id = action.payload.id;
  state.cartItems = state.cartItems.filter(item => item.id !== id);
  state.totalPrice = calcTotalPrice(state.cartItems);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart,
    updateQuantity,
    removeFromCart
  }
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
