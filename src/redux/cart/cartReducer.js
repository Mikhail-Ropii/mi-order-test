import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    discount: 0,
    _id: null,
    isLoading: false,
  },
  reducers: {
    isLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    addToCart: (state, { payload }) => {
      state.cart.push(payload);
    },
    changeQty: (state, { payload }) => {
      state.cart.map((product) => {
        if (product.article === payload.article) {
          product.qty = payload.qty;
          product.sum = payload.qty * payload.priceDiscount;
        }
      });
    },
    deleteProduct: (state, { payload }) => {
      const cart = state.cart.filter((product) => product.article != payload);
      return { ...state, cart };
    },
    clearOrder: (state) => {
      state.cart = [];
    },
    addClientName: (state, { payload }) => {
      state.clientName = payload;
    },
    setDiscount: (state, { payload }) => {
      state.discount = payload;
    },
    changeDiscount: (state) => {
      state.cart.map((element) => {
        element.priceDiscount = (element.price * (100 - state.discount)) / 100;
        element.sum =
          (element.qty * (element.price * (100 - state.discount))) / 100;
        element.discount = state.discount;
      });
    },
    changeOrder: (state, { payload }) => {
      state.cart = payload.items;
      state._id = payload._id;
    },
  },
});
