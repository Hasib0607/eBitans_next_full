"use client";
import useTheme from "@/hooks/use-theme";
import PopUpCart from "./popup-cart";

const CartPopUp = () => {
  const { design } = useTheme();
  return (
    <>{design?.product_card && <PopUpCart theme={design?.product_card} />}</>
  );
};

export default CartPopUp;
