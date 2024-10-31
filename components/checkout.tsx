import { useEffect, useState } from "react";
import CheckOutEleven from "./_checkout-page/checkout/checkout-eleven/checkout-eleven";
import CheckOutsFive from "./_checkout-page/checkout/checkout-five/checkout-five";
import CheckOutFour from "./_checkout-page/checkout/checkout-four/checkout-four";
import CheckOutForty from "./_checkout-page/checkout/checkout-fourty/checkout-forty";
import CheckOutSeven from "./_checkout-page/checkout/checkout-seven/checkout-seven";
import CheckOutTwentyOne from "./_checkout-page/checkout/checkout-twentyone/checkout-twentyone";
import getReferralCode from "@/utils/getReferralCode";
import CheckOutOne from "./_checkout-page/checkout/checkout-one/checkout-one";

const Checkout = ({ theme }: any) => {
  const [referralCode, setReferralCode] = useState<string>("");
  const [referralLink, setReferralLink] = useState<string>("");

  useEffect(() => {
    const fetchReferralCode = async () => {
      try {
        const code: string | null = await getReferralCode(); // Assuming getReferralCode() returns a string or null
        if (code) {
          setReferralCode(code); // Store the referral code
          const link = `${window.location.href}?referral=${code}`; // Create the referral link using backticks
          setReferralLink(link);
        }
      } catch (error) {
        console.error("Error fetching referral code:", error);
      }
    };

    fetchReferralCode();
  }, []);

  return (
    <div>
      {theme === "one" && <CheckOutOne />}
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
