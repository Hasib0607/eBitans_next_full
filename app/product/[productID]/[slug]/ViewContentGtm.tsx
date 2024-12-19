"use client";

import { ViewContent } from "@/helper/fb-tracking";
import useTheme from "@/hooks/use-theme";
import { sendGTMEvent } from "@next/third-parties/google";
import { useCallback, useEffect } from "react";

const ViewContentGtm = ({ product }: any) => {
  const { headerSetting } = useTheme();
  const currency = headerSetting?.code;

  const items = {
    id: product.SKU || "",
    item_id: product.SKU || "",
    item_name: product.name || "",
    currency: headerSetting?.code,
    price: parseFloat(product.regular_price) || 0,
    item_brand: product.brand || "",
    google_business_vertical: "retail",
    discount: parseFloat(product.discount_price) || 0,
    item_category: product.category || "General",
    item_category2: product.subcategory || "General",
    item_variant: product.slug || "default",
    quantity: parseInt(product.quantity, 10) || 1,
    tax_rate: parseFloat(product.tax_rate) || 0,
    shipping_fee: parseFloat(product.shipping_fee) || 0,
  };

  const sendEvent = useCallback(() => {
    sendGTMEvent({
      event: "view_item",
      pageType: "product-page",
      productType: "simple",
      ecommerce: {
        items: [items],
      },
      value: parseFloat(product.regular_price) || 0,
      currency: headerSetting?.code || "BDT",
    });

    const content_ids = product?.id;
    const content_type = "product";
    const content_name = product?.name;
    const content_category = product?.category;
    const value = product?.regular_price - product?.discount_price;
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
    sendConversionEvent(product);
  }, [product, sendEvent]);

  return null;
};

export default ViewContentGtm;

async function sendConversionEvent(product: any) {
  try {
    const response = await fetch("/api/conversion-api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pixelId: product.pixelId,
        accessToken: process.env.NEXT_PUBLIC_FB_ACCESS_TOKEN, // Use public env variable
        productSku: product.SKU,
        quantity: product.quantity || 1,
        sourceUrl: typeof window !== "undefined" ? window.location.href : "", // Ensure `window` is available
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to send conversion event.");
    }

    console.log("Conversion event sent successfully:", data);
  } catch (error) {
    // console.error("Error sending conversion event:", error.message);
  }
}
