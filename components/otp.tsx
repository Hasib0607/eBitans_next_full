import React from "react";
import VerifyOtpOne from "./otp/verify-otp-one";
import VerifyOtpFour from "./otp/verify-otp-four";
import VerifyOtpFive from "./otp/verify-otp-five";
import VerifyOtpSeven from "./otp/verify-otp-seven";
import VerifyOtpEleven from "./otp/verify-otp-eleven";
import VerifyOtpTwentyOne from "./otp/verify-otp-twentyone";

const OTP = ({ theme }: any) => {
  return (
    <>
      {theme === "one" && <VerifyOtpOne />}
      {theme === "two" && <VerifyOtpFour />}
      {theme === "three" && <VerifyOtpFour />}
      {theme === "four" && <VerifyOtpFour />}
      {theme === "five" && <VerifyOtpFive />}
      {theme === "seven" && <VerifyOtpSeven />}
      {theme === "eleven" && <VerifyOtpEleven />}
      {theme === "fourteen" && <VerifyOtpSeven />}
      {theme === "fifteen" && <VerifyOtpSeven />}
      {theme === "sixteen" && <VerifyOtpFour />}
      {theme === "seventeen" && <VerifyOtpFour />}
      {theme === "eighteen" && <VerifyOtpFive />}
      {theme === "nineteen" && <VerifyOtpSeven />}
      {theme === "twenty" && <VerifyOtpSeven />}
      {theme === "twentyone" && <VerifyOtpFour />}
      {theme === "twentytwo" && <VerifyOtpTwentyOne />}
      {theme === "twentythree" && <VerifyOtpTwentyOne />}
      {theme === "twentyfour" && <VerifyOtpFour />}
      {theme === "twentyfive" && <VerifyOtpSeven />}
      {theme === "twentysix" && <VerifyOtpFour />}
      {theme === "twentyseven" && <VerifyOtpFour />}
      {theme === "twentyeight" && <VerifyOtpFour />}
      {theme === "twentynine" && <VerifyOtpFour />}
      {theme === "thirty" && <VerifyOtpFour />}
      {theme === "thirtyone" && <VerifyOtpFour />}
      {theme === "thirtythree" && <VerifyOtpFour />}
      {theme === "thirtyfour" && <VerifyOtpFour />}
      {theme === "thirtyfive" && <VerifyOtpFour />}
    </>
  );
};

export default OTP;
