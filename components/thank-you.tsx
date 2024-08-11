"use client";
import React from "react";
import { TiTickOutline } from "react-icons/ti";
import useTheme from "@/hooks/use-theme";
import { useRouter } from "next/navigation";

const ThankYou = () => {
  const router = useRouter();
  const { orderPlaced, design } = useTheme();

  const styleCss = `
  .order-info {
      background:  ${design?.header_color};
      color:  ${design?.text_color};
  }
`;
  if (!orderPlaced) {
    router.push("/profile/order");
    return null;
  }

  return (
    <div className="flex flex-col gap-3 justify-center items-center font-bold h-screen">
      <style>{styleCss}</style>
      <TiTickOutline className="text-green-500 text-6xl" />
      <p className="text-2xl lg:text-3xl">Thank you for your order</p>
      <a href="/profile/order">
        <button className="order-info py-2 px-4 text-base rounded-md">
          Order Info
        </button>
      </a>
      <a href="/shop">
        <button className="text-base rounded-md underline text-[#f1593a]">
          Continue Shopping
        </button>
      </a>
    </div>
  );
};

export default ThankYou;
