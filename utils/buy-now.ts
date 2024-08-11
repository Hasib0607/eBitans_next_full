import { toast } from "react-toastify";

export const buyNow = (
  variant: any,
  size: any,
  color: any,
  unit: any,
  filterV: any,
  add_to_cart: any,
  router: any
) => {
  if (variant?.length && !size && !color && !unit) {
    toast("Please Select Variant", {
      type: "warning",
      autoClose: 1000,
    });
  } else if (variant?.length && !size && color && filterV?.length) {
    toast("Please Select Variant", {
      type: "warning",
      autoClose: 1000,
    });
  } else {
    add_to_cart();
    router.push("/checkout");
  }
};
