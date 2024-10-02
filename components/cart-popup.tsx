"use client";
import useTheme from "@/hooks/use-theme";
import PopUpCart from "./popup-cart";
// import AllMobileBottomMenu from "@/app/mobileBottomMenu";

const CartPopUp = () => {
  const { design } = useTheme();
  return (
    // <><AllMobileBottomMenu/>{design?.product_card && <PopUpCart theme={design?.product_card} />}
    <>{design?.product_card && <PopUpCart theme={design?.product_card} />}
    </>
  );
};

export default CartPopUp;
