import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/auth.slice";
import productReducer from "./features/product.slice";
import messageReducer from "./features/message.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: productReducer,
  message: messageReducer,
});

export default rootReducer;
