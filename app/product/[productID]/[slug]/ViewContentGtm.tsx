"use client";

import { ViewContent } from "@/helper/fb-tracking";
import useTheme from "@/hooks/use-theme";
import { sendGTMEvent } from "@next/third-parties/google";
import { useCallback, useEffect } from "react";

const ViewContentGtm = ({ product }: any) => {
  const { headerSetting } = useTheme();
  const sendEvent = useCallback(() => {
    sendGTMEvent({
      event: "view_content",
      value: {
        product,
      },
    });

    const currency = headerSetting?.code; // Define the currency
    const content_ids = product?.id; // Assuming `product.id` is the content ID
    const content_type = "product"; // Example value, replace with the actual content type
    const content_name = product?.name; // Assuming `product.name` is the content name
    const content_category = product?.category; // Assuming `product.category` is the content category
    const value = product?.regular_price - product?.discount_price; // Assuming `product.price` is the value
    const sku = product?.SKU;

    ViewContent(
      product,
      content_ids,
      content_type,
      content_name,
      content_category,
      value,
      currency,
      sku
    );
  }, [product, headerSetting]);

  useEffect(() => {
    sendEvent();
  }, [sendEvent]);

  return null;
};

export default ViewContentGtm;
