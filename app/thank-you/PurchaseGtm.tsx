"use client";

import { Purchase } from "@/helper/fb-tracking";
import useTheme from "@/hooks/use-theme";
import { sendGTMEvent } from "@next/third-parties/google";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const PurchaseGtm = () => {
  const { headerSetting } = useTheme();
  const cartList = useSelector((state: any) => state.cart.cartList);
  const searchParams = useSearchParams();
  // const total = searchParams.get("total");
  const total = cartList.reduce((accumulator: any, item: any) => {
    return accumulator + item.price * item.qty;
  }, 0);
  const currency = headerSetting?.code; // Define currency here or dynamically set it as needed
  console.log("total", total);
  useEffect(() => {
    sendGTMEvent({
      event: "purchase",
      value: cartList,
    });
    Purchase(total, currency); // Now providing both total and currency
  }, [total, currency]);

  return null;
};

export default PurchaseGtm;
