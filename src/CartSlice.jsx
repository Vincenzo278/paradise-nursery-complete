import { createSlice } from '@reduxjs/toolkit';
const cartSlice = createSlice({
 name: 'cart', initialState: { items: [] },
 reducers: {
  addToCart(state, action) { const p = action.payload; const found = state.items.find(x => x.id === p.id); if (found) found.quantity += 1; else state.items.push({...p, quantity: 1}); },
  increaseQuantity(state, action) { const x = state.items.find(p => p.id === action.payload); if (x) x.quantity += 1; },
  decreaseQuantity(state, action) { const x = state.items.find(p => p.id === action.payload); if (x && x.quantity > 1) x.quantity -= 1; },
  removeFromCart(state, action) { state.items = state.items.filter(p => p.id !== action.payload); },
  clearCart(state) { state.items = []; }
 }
});
export const {addToCart,increaseQuantity,decreaseQuantity,removeFromCart,clearCart} = cartSlice.actions;
export default cartSlice.reducer;
