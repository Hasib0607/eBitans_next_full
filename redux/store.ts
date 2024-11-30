"use client";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import rootReducer from "./root-reducer";
import { apiSlice } from "./features/api/apiSlice";

// Create a fallback for environments where localStorage is not available
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

// Use client storage only if window is defined, otherwise use noop storage (for server-side rendering)
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "root",
  storage,
  blacklist: [apiSlice.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        // Ignore non-serializable values in the register and rehydrate paths
        ignoredPaths: ["register", "rehydrate"],
        serializableCheck: false, // Disable serializable check
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);
export default store;
