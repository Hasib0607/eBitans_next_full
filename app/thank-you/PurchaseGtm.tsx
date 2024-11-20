"use client";

import { Purchase } from "@/helper/fb-tracking";
import useTheme from "@/hooks/use-theme";
import { sendGTMEvent } from "@next/third-parties/google";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PurchaseGtm = () => {
  const { headerSetting } = useTheme();
  const cartList = useSelector((state: any) => state.cart.cartList);
  const [total, setTotal] = useState<number | null>(null);
  const searchParams = useSearchParams();

  const currency = headerSetting?.code;

  useEffect(() => {
    // Extract 'total' from search parameters
    const queryTotal = searchParams.get("total");

    // Parse the total value safely
    const parsedTotal = queryTotal ? parseFloat(queryTotal) : null;

    setTotal(parsedTotal);
  }, [searchParams]);

  useEffect(() => {
    if (total !== null && currency) {
      // Send the Google Tag Manager event
      sendGTMEvent({
        event: "purchase",
        currency,
        value: {
          items: cartList.map((item: any) => ({
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
          })),
        },
      });

      // Call the `Purchase` tracking function
      Purchase(total, currency);
    }
  }, [total, currency, cartList]);

  return null;
};

export default PurchaseGtm;