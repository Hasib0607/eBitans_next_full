import { toast } from "react-toastify";

export const bookNow = (
  variant: any,
  size: any,
  color: any,
  unit: any,
  filterV: any,
  setOpenBooking: any,
  openBooking: any
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
    setOpenBooking(!openBooking);
  }
};
