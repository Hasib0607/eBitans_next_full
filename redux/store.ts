"use client"
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./root-reducer";

const persistConfig = {
  key: "root",
  storage,
};

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  devTools: true,
});

export const persistor = persistStore(store);
export default store;
