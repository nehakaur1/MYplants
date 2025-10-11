import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,

  },
});

// persist cart items to localStorage whenever state changes
store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem("cartItems", JSON.stringify(state.cart.items));
  } catch (err) {
    console.error("Failed to persist cart", err);
  }
});
