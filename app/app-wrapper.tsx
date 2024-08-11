"use client";
import store, { persistor } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Footer from "@/components/footer";
import ThemeProvider from "@/hooks/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import Header from "@/components/header";
import CartPopUp from "@/components/cart-popup";
const queryClient = new QueryClient();

const AppWrapper = ({ children, design, headerSetting }: any) => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Header design={design} headerSetting={headerSetting} />
            {children}
            <Footer />
            <CartPopUp />
            <ToastContainer position="top-right" newestOnTop />
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default AppWrapper;
