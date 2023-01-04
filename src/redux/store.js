import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { cartSlice } from "./cart/cartReducer";

const rootReducer = combineReducers({
  [cartSlice.name]: cartSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
