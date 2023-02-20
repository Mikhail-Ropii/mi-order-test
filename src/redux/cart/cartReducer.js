import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    discount: 0,
    _id: null,
    clientName: null,
    isLoading: false,
  },
  reducers: {
    isLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    addToCart: (state, { payload }) => {
      state.cart = state.cart.concat(payload);
    },
    changeQty: (state, { payload }) => {
      state.cart.map((product) => {
        if (product.article === payload.currentArticle) {
          product.qty = payload.qty;
          product.sum = payload.qty * product.priceDiscount;
        }
      });
    },
    deleteProduct: (state, { payload }) => {
      const cart = state.cart.filter((product) => product.article != payload);
      return { ...state, cart };
    },
    clearOrder: (state) => {
      state.cart = [];
      state._id = null;
      state.clientName = null;
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
      });
    },
    setCurrentClient: (state, { payload }) => {
      state._id = payload._id;
      state.clientName = payload.clientName;
    },
  },
});
