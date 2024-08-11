"use client";
import React from "react";
import ChangePasswordFour from "@/components/change-password/change-password-four";
import ChangePasswordSeven from "@/components/change-password/change-password-seven";
import useTheme from "@/hooks/use-theme";

const ChangePasswordComponent = () => {
  const {
    design: { profile_page },
  } = useTheme();
  return (
    <div>
      {profile_page === "one" && <ChangePasswordFour />}
      {profile_page === "two" && <ChangePasswordFour />}
      {profile_page === "three" && <ChangePasswordFour />}
      {profile_page === "four" && <ChangePasswordFour />}
      {profile_page === "five" && <ChangePasswordFour />}
      {profile_page === "six" && <ChangePasswordFour />}
      {profile_page === "seven" && <ChangePasswordFour />}
      {profile_page === "eight" && <ChangePasswordFour />}
      {profile_page === "nine" && <ChangePasswordSeven />}
      {profile_page === "ten" && <ChangePasswordSeven />}
      {profile_page === "eleven" && <ChangePasswordSeven />}
      {profile_page === "twelve" && <ChangePasswordSeven />}
      {profile_page === "thirteen" && <ChangePasswordSeven />}
      {profile_page === "fourteen" && <ChangePasswordSeven />}
      {profile_page === "sixteen" && <ChangePasswordSeven />}
      {profile_page === "seventeen" && <ChangePasswordSeven />}
      {profile_page === "eighteen" && <ChangePasswordSeven />}
      {profile_page === "nineteen" && <ChangePasswordSeven />}
      {profile_page === "twenty" && <ChangePasswordSeven />}
      {profile_page === "twentyone" && <ChangePasswordFour />}
      {profile_page === "twentythree" && <ChangePasswordFour />}
      {profile_page === "twentyfour" && <ChangePasswordFour />}
      {profile_page === "twentyfive" && <ChangePasswordFour />}
      {profile_page === "twentysix" && <ChangePasswordFour />}
      {profile_page === "twentyseven" && <ChangePasswordFour />}
      {profile_page === "twentyeight" && <ChangePasswordFour />}
      {profile_page === "twentynine" && <ChangePasswordFour />}
      {profile_page === "thirty" && <ChangePasswordFour />}
      {profile_page === "thirtyone" && <ChangePasswordFour />}
      {profile_page === "thirtyhree" && <ChangePasswordFour />}
      {profile_page === "thirtyfour" && <ChangePasswordFour />}
      {profile_page === "thirtyfive" && <ChangePasswordFour />}
      {profile_page === "thirtyseven" && <ChangePasswordFour />}
    </div>
  );
};

export default ChangePasswordComponent;
