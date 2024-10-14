export const PageView = () => {
  window.fbq("track", "PageView");
};

export const Purchase = (value: any) => {
  window.fbq("track", "Purchase", {
    value,
  });
};

export const AddToCart = (item: any) => {
  window.fbq("track", "AddToCart", {
    item,
  });
};

export const Checkout = (items: any) => {
  window.fbq("track", "Checkout", {
    item: items,
  });
};

export const ViewContent = (item: any) => {
  window.fbq("track", "ViewContent", { item });
};
