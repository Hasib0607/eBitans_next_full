import BDT from "@/utils/bdt";

export const PageView = () => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "PageView");
  } else {
    console.warn("Facebook Pixel (fbq) is not initialized.");
  }
};

export const Purchase = (value: any, currency: any) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Purchase", { value, currency });
  } else {
    console.warn("Facebook Pixel (fbq) is not initialized.");
  }
};

export const AddToCart = (item: any, content_ids: any, content_type: any) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "AddToCart", { item, content_ids, content_type });
  } else {
    console.warn("Facebook Pixel (fbq) is not initialized.");
  }
};

export const Checkout = (
  item: any,
  content_ids: any,
  content_type: any,
  content_name: any,
  content_category: any,
  value: any
) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Checkout", {
      item,
      content_ids,
      content_type,
      content_name,
      content_category,
      value,
      currency: <BDT />,
    });
  } else {
    console.warn("Facebook Pixel (fbq) is not initialized.");
  }
};

export const ViewContent = (
  item: any,
  content_ids: any,
  content_type: any,
  content_name: any,
  content_category: any,
  value: any
) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "ViewContent", {
      item,
      content_ids,
      content_type,
      content_name,
      content_category,
      value,
      currency: <BDT />,
    });
  } else {
    console.warn("Facebook Pixel (fbq) is not initialized.");
  }
};
