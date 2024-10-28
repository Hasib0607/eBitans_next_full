import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/auth.slice";
import messageReducer from "./features/message.slice";
import productReducer from "./features/product.slice";
import designReducer from "./features/design.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: productReducer,
  message: messageReducer,
  design: designReducer,
});

export default rootReducer;
