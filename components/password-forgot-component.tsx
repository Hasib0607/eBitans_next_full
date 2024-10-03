"use client";
import React from "react";
import ForgotOne from "@/components/forgot-password/forgot-one";
import ForgotFour from "@/components/forgot-password/forgot-four";
import ForgotFive from "@/components/forgot-password/forgot-five";
import ForgotSeven from "@/components/forgot-password/forgot-seven";
import ForgotEleven from "@/components/forgot-password/forgot-eleven";
import ForgotFifteen from "@/components/forgot-password/forgot-fifteen";
import ForgotTwentyOne from "@/components/forgot-password/forgot-twentyone";
import useTheme from "@/hooks/use-theme";

const PasswordForgotComponent = () => {
  const {
    design: { login_page: theme },
  } = useTheme();
  return (
    <>
      {theme === "one" && <ForgotOne />}
      {theme === "two" && <ForgotFour />}
      {theme === "three" && <ForgotFour />}
      {theme === "four" && <ForgotFour />}
      {theme === "five" && <ForgotFive />}
      {theme === "seven" && <ForgotSeven />}
      {theme === "eleven" && <ForgotEleven />}
      {theme === "fourteen" && <ForgotSeven />}
      {theme === "fifteen" && <ForgotFifteen />}
      {theme === "sixteen" && <ForgotFour />}
      {theme === "seventeen" && <ForgotFour />}
      {theme === "eighteen" && <ForgotFive />}
      {theme === "nineteen" && <ForgotFifteen />}
      {theme === "twenty" && <ForgotSeven />}
      {theme === "twentyone" && <ForgotTwentyOne />}
      {theme === "twentytwo" && <ForgotTwentyOne />}
      {theme === "twentythree" && <ForgotOne />}
      {theme === "twentyfour" && <ForgotFour />}
      {theme === "twentyfive" && <ForgotFifteen />}
      {theme === "twentysix" && <ForgotFour />}
      {theme === "twentyseven" && <ForgotFour />}
      {theme === "twentyeight" && <ForgotFour />}
      {theme === "twentynine" && <ForgotFour />}
      {theme === "thirty" && <ForgotFour />}
      {theme === "thirtyone" && <ForgotFour />}
      {theme === "thirtyhree" && <ForgotFour />}
      {theme === "thirtyfour" && <ForgotFour />}
      {theme === "thirtyfive" && <ForgotFour />}
    </>
  );
};

export default PasswordForgotComponent;
