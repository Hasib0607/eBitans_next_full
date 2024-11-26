import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/auth.slice";
import messageReducer from "./features/message.slice";
import productReducer from "./features/product.slice";
import { apiSlice } from "./features/api/apiSlice";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  cart: productReducer,
  message: messageReducer,
});

export default rootReducer;
