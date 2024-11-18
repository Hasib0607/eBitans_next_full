"use client";

import { Checkout } from "@/helper/fb-tracking";
import useTheme from "@/hooks/use-theme";
import { sendGTMEvent } from "@next/third-parties/google";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

const CheckoutGtm = () => {
  const cartList = useSelector((state: any) => state.cart.cartList);
  const { headerSetting } = useTheme();
  const currency = headerSetting?.code;
  const items = cartList.map((item: any, index: number) => ({
    item_name: item?.name,
    item_category_id: item?.category_id,
    item_category: item?.category || "",
    item_category2: item.subcategory || "General",
    item_id: item?.SKU,
    discount: parseFloat(item.discount_price) || 0,
    item_variant: item.color || "default",
    price: parseFloat(item.price) || 0,
    quantity: item?.qty,
    tax_rate: parseFloat(item.tax_rate) || 0,
    shipping_fee: item.shipping_fee || 0,
  }));

  const checkoutEvent = useCallback(() => {
    sendGTMEvent({
      event: "checkout",
      currency,
      value: {
        items,
      },
    });

    const totalPrice = cartList.reduce((accumulator: any, item: any) => {
      return accumulator + item.price * item.qty;
    }, 0);
    // const sku = cartList[0].SKU;
    const sku = cartList.map((item: { SKU: any }) => item.SKU);

    Checkout(cartList, totalPrice, sku, currency);
  }, [cartList, headerSetting]);
  useEffect(() => {
    checkoutEvent();
  }, []);
  return null;
};

export default CheckoutGtm;
