/* eslint-disable no-cond-assign */
export const getPrice = (
  regular_price: any,
  discount_price: any,
  discount_type: any
) => {
  if (discount_type === "percent") {
    const price = Math.floor(
      regular_price - (parseInt(discount_price) / 100) * parseInt(regular_price)
    );
    return price;
  }
  if (discount_type === "fixed") {
    const price = Math.floor(
      parseInt(regular_price) - parseInt(discount_price)
    );
    return price;
  }
  if (discount_type === "no_discount") {
    const price = Math.floor(parseInt(regular_price));
    return price;
  }
};
