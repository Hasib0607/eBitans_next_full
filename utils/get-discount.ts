export const getDiscount = (
  total: any,
  discount_amount: any,
  discount_type: any
) => {
  if (discount_type === "percent") {
    const price = total - (discount_amount / 100) * total;
    return price;
  }
  if (discount_type === "fixed") {
    const price = total - discount_amount;
    return price;
  }
};
