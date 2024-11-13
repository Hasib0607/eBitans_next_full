"use client";

import { ViewContent } from "@/helper/fb-tracking";
import useTheme from "@/hooks/use-theme";
import { sendGTMEvent } from "@next/third-parties/google";
import { useCallback, useEffect } from "react";

const ViewContentGtm = ({ product }: any) => {
  const { headerSetting } = useTheme();
  const currency = headerSetting?.code;
  console.log(product)
  const productData = {
    item_id: product.SKU || "", 
    item_name: product.name || "",  
    discount: parseFloat(product.discount_price) || 0, 
    item_category: product.category || "General", 
    item_category2: product.subcategory || "General",
    item_variant: product.slug || "default",
    price: parseFloat(product.regular_price) || 0,
    quantity: parseInt(product.quantity, 10) || 1, 
    tax_rate: parseFloat(product.tax_rate) || 0, 
    shipping_fee: parseFloat(product.shipping_fee) || 0, 
  };
  const sendEvent = useCallback(() => {
    sendGTMEvent({
      event: "view_content",
      currency,
      value: {
        productData,
      },
    });

    // const currency = headerSetting?.code;
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
