import CartPopUpFive from "./shopping-cart/cart-popup-five";
import CartPopUpFour from "./shopping-cart/cart-popup-four";
import CartPopUpThree from "./shopping-cart/cart-popup-three";
import CartPopUpSix from "./shopping-cart/six/cart-popup-six";

const PopUpCart = ({ theme }: any) => {
  // nothing
  return (
    <>
      {/* 1. square middle  */}
      {/* 2. square bottom  */}
      {/* 3. circle  */}
      {/* 4. square animated  */}
      {theme === "default" && <CartPopUpThree />}
      {theme === "one" && <CartPopUpSix />}
      {theme === "two" && <CartPopUpFour />}
      {theme === "three" && <CartPopUpThree />}
      {theme === "four" && <CartPopUpFour />}
      {theme === "five" && <CartPopUpFive />}
    </>
  );
};

export default PopUpCart;
