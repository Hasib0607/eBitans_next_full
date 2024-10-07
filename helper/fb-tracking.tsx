export const PageView = () => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "PageView");
  } else {
    console.warn("Facebook Pixel (fbq) is not initialized.");
  }
};

export const Purchase = (value: any) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Purchase", { value });
  } else {
    console.warn("Facebook Pixel (fbq) is not initialized.");
  }
};

export const AddToCart = (item: any) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "AddToCart", { item });
  } else {
    console.warn("Facebook Pixel (fbq) is not initialized.");
  }
};

export const Checkout = (items: any) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Checkout", { item: items });
  } else {
    console.warn("Facebook Pixel (fbq) is not initialized.");
  }
};

export const ViewContent = (item: any) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "ViewContent", { item });
  } else {
    console.warn("Facebook Pixel (fbq) is not initialized.");
  }
};
