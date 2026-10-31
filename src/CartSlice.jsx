import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',

  initialState: {
    items: []
  },

  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find(item => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },

    addItem(state, action) {
      const product = action.payload;
      const existing = state.items.find(item => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },

    increaseQuantity(state, action) {
      const item = state.items.find(item => item.id === action.payload);
      if (item) item.quantity += 1;
    },

    decreaseQuantity(state, action) {
      const item = state.items.find(item => item.id === action.payload);

      if (item) {
        item.quantity -= 1;

        if (item.quantity <= 0) {
          state.items = state.items.filter(p => p.id !== action.payload);
        }
      }
    },

    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find(p => p.id === id);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(p => p.id !== id);
        } else {
          item.quantity = quantity;
        }
      }
    },

    removeFromCart(state, action) {
      state.items = state.items.filter(
        item => item.id !== action.payload
      );
    },

    removeItem(state, action) {
      state.items = state.items.filter(
        item => item.id !== action.payload
      );
    },

    clearCart(state) {
      state.items = [];
    }
  }
});

export const {
  addToCart,
  addItem,
  increaseQuantity,
  decreaseQuantity,
  updateQuantity,
  removeFromCart,
  removeItem,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;