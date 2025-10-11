import { createSlice } from "@reduxjs/toolkit";

const initialItems = JSON.parse(localStorage.getItem("cartItems")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: initialItems }, // array of {id,name,price,image,quantity}
  reducers: {
    addToCart: (state, action) => {
      const incoming = action.payload; // {id,...,quantity}
      const found = state.items.find((i) => i.id === incoming.id);
      if (found) {
        found.quantity = Number(found.quantity) + Number(incoming.quantity || 1);
      } else {
        state.items.push({ ...incoming, quantity: Number(incoming.quantity || 1) });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) item.quantity = Math.max(1, Number(quantity));
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
