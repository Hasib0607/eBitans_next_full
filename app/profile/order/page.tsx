"use client";
import React from "react";
import { useSelector } from "react-redux";
import OrderComponent from "@/components/order-component";

const OrderPage = () => {
  const { user } = useSelector((state: any) => state.auth);
  if (user?.verify) {
    return <OrderComponent />;
  }
};

export default OrderPage;
