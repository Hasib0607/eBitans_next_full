import CheckOutEleven from "./_checkout-page/checkout/checkout-eleven/checkout-eleven";
import CheckOutsFive from "./_checkout-page/checkout/checkout-five/checkout-five";
import CheckOutFour from "./_checkout-page/checkout/checkout-four/checkout-four";
import CheckOutForty from "./_checkout-page/checkout/checkout-fourty/checkout-forty";
import CheckOutSeven from "./_checkout-page/checkout/checkout-seven/checkout-seven";
import CheckOutTwentyOne from "./_checkout-page/checkout/checkout-twentyone/checkout-twentyone";

const Checkout = ({ theme }: any) => {
  console.log(theme, "theme");

  return <CheckOutTwentyOne />;
  return (
    <div>
      {theme === "one" && <CheckOutFour />}
      {theme === "two" && <CheckOutFour />}
      {theme === "three" && <CheckOutSeven />}
      {theme === "four" && <CheckOutFour />}
      {theme === "five" && <CheckOutFour />}
      {theme === "six" && <CheckOutsFive />}
      {theme === "seven" && <CheckOutSeven />}
      {theme === "eight" && <CheckOutEleven />}
      {theme === "nine" && <CheckOutFour />}
      {theme === "ten" && <CheckOutEleven />}
      {theme === "eleven" && <CheckOutEleven />}
      {theme === "twelve" && <CheckOutEleven />}
      {theme === "thirteen" && <CheckOutFour />}
      {theme === "fourteen" && <CheckOutsFive />}
      {theme === "fifteen" && <CheckOutSeven />}
      {theme === "sixteen" && <CheckOutEleven />}
      {theme === "seventeen" && <CheckOutFour />}
      {theme === "eighteen" && <CheckOutsFive />}
      {theme === "nineteen" && <CheckOutSeven />}
      {theme === "twenty" && <CheckOutSeven />}
      {theme === "twentyone" && <CheckOutTwentyOne />}
      {theme === "twentytwo" && <CheckOutTwentyOne />}
      {theme === "twentythree" && <CheckOutFour />}
      {theme === "twentyfour" && <CheckOutTwentyOne />}
      {theme === "twentyfive" && <CheckOutFour />}
      {theme === "twentysix" && <CheckOutEleven />}
      {theme === "twentyseven" && <CheckOutTwentyOne />}
      {theme === "twentyeight" && <CheckOutTwentyOne />}
      {theme === "twentynine" && <CheckOutTwentyOne />}
      {theme === "thirty" && <CheckOutEleven />}
      {theme === "thirtyone" && <CheckOutTwentyOne />}
      {theme === "thirtyfive" && <CheckOutTwentyOne />}
      {theme === "thirtysix" && <CheckOutTwentyOne />}
      {theme === "forty" && <CheckOutForty />}
    </div>
  );
};

export default Checkout;
