import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    clientName: null,
    cart: [],
  },
  reducers: {
    addToCart: (state, { payload }) => {
      state.cart.push(payload);
    },
    changeQty: (state, { payload }) => {
      state.cart.map((product) => {
        if (product.article === payload.currentArticle) {
          product.qty = payload.qty;
        }
      });
    },
    deleteProduct: (state, { payload }) => {
      const cart = state.cart.filter((product) => product.article != payload);
      return { ...state, cart };
    },
    addClientName: (state, { payload }) => {
      state.clientName = payload;
    },
  },
});
