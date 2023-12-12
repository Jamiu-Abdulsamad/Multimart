import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

// Load cart items from local storage if available
const savedCart = localStorage.getItem("cart");
if (savedCart) {
  initialState.cartItems = JSON.parse(savedCart);
  initialState.totalQuantity = initialState.cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  initialState.totalAmount = initialState.cartItems.reduce(
    (total, item) => total + Number(item.totalPrice),
    0
  );
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );

      state.totalQuantity++;

      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          productName: newItem.productName,
          imgUrl: newItem.imgUrl,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
      }

      // Calculate total amount and update local storage
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.totalPrice),
        0
      );
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    removeItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity--;

        if (existingItem.quantity === 0) {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        }

        state.totalQuantity--;

        // Calculate total amount and update local storage
        state.totalAmount = state.cartItems.reduce(
          (total, item) => total + Number(item.totalPrice),
          0
        );
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
      }
    },
    clearCart: (state) => {
      // Clear the cart items, total amount, and total quantity
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;

      // Update local storage
      localStorage.removeItem("cart");
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
