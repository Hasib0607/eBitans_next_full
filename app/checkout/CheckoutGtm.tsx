"use client";

import { Checkout } from "@/helper/fb-tracking";
import { sendGTMEvent } from "@next/third-parties/google";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

const CheckoutGtm = () => {
  const cartList = useSelector((state: any) => state.cart.cartList);
  const checkoutEvent = useCallback(() => {
    sendGTMEvent({
      event: "checkout",
      value: cartList,
    });
    Checkout(cartList);
  }, [cartList]);
  useEffect(() => {
    checkoutEvent();
  }, []);
  return null;
};

export default CheckoutGtm;
