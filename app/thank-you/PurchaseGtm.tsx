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
<<<<<<< HEAD
  const total = searchParams.get("total");
=======
  // const total = searchParams.get("total");
  const total = cartList.reduce((accumulator: any, item: any) => {
    return accumulator + item.price * item.qty;
  }, 0);
  const currency = headerSetting?.code; // Define currency here or dynamically set it as needed
  console.log("total", total);
>>>>>>> 09fa727b75610b7b7c14ec3d1b0fb1b77d177929
  useEffect(() => {
    sendGTMEvent({
      event: "purchase",
      value: cartList,
    });
    Purchase(total);
  }, []);

  return null;
};

export default PurchaseGtm;
