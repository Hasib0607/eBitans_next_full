"use client";
import OTP from "@/components/otp";
import useTheme from "@/hooks/use-theme";
import React from "react";

const VerifyOtp = () => {
  const { design } = useTheme();
  return (
    <div
      className={`${
        design?.header === "fourteen"
          ? "lg:mt-[80px]"
          : design?.header === "thirtyfive"
          ? "mt-[80px]"
          : design?.header === "twentytwo"
          ? "lg:mt-[80px]"
          : design?.header === "twentyseven"
          ? "mt-[80px]"
          : design?.header === "twentyfive"
          ? "lg:mt-[80px]"
          : design?.header === "thirtysix"
          ? "mt-[80px]"
          : "lg:mt-[0px]"
      }`}
    >
      {design?.login_page && <OTP theme={design?.login_page} />}
    </div>
  );
};

export default VerifyOtp;
