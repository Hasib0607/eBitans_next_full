"use client";

import { Checkout } from "@/helper/fb-tracking";
import useTheme from "@/hooks/use-theme";
import { sendGTMEvent } from "@next/third-parties/google";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

const CheckoutGtm = () => {
  const cartList = useSelector((state: any) => state.cart.cartList);
  const { headerSetting } = useTheme();
  const checkoutEvent = useCallback(() => {
    sendGTMEvent({
      event: "checkout",
      value: cartList,
    });

    const totalPrice = cartList.reduce((accumulator: any, item: any) => {
      return accumulator + item.price * item.qty;
    }, 0);
    // const sku = cartList[0].SKU;
    const sku = cartList.map((item: { SKU: any }) => item.SKU);
    const currency = headerSetting?.code;

    Checkout(cartList, totalPrice, sku, currency);
  }, [cartList]);
  useEffect(() => {
    checkoutEvent();
  }, []);
  return null;
};

export default CheckoutGtm;
