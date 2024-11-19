"use client";
import React from "react";
import bkashLogo from "@/assets/paymentMethodLogo/bkashLogo.png";
import useTheme from "@/hooks/use-theme";
import { customizeCheckout } from "@/utils/customizeDesign";
import { FaTruck } from "react-icons/fa";

const PaymentGateway = ({ selectPayment, setSelectPayment }: any) => {
  const { design, headerSetting, module, store_id } = useTheme();
  const advancePay = module?.find((item: any) => item?.modulus_id === 106);

  const checkoutData = customizeCheckout.find((item) => item.id == store_id);

  return (
    <div className="mt-5">
      <div className="col-span-6 sm:col-span-4">
        <div className="flex justify-between items-center py-3">
          <label className="block text-xl font-semibold text-gray-700">
            পেমেন্ট
            <span className="text-sm">
              (আপনার পেমেন্ট পদ্ধতি নির্বাচন করুন)
            </span>
          </label>
        </div>

        <div className="flex flex-col gap-2">
          {headerSetting?.online === "active" && (
            <label
              style={{
                backgroundColor:
                  selectPayment === "online" ? design?.header_color : "#fff",
                color: selectPayment === "online" ? design?.text_color : "#000",
              }}
              className="py-2 px-5 rounded-lg w-full transition-colors duration-300 flex items-center cursor-pointer hover:bg-gray-100"
            >
              <input
                type="radio"
                name="payment_method"
                value="online"
                checked={selectPayment === "online"}
                onChange={(e) => setSelectPayment(e.target.value)}
                className="mr-2"
              />
              SSL Commerz
            </label>
          )}

          {headerSetting?.bkash === "active" && (
            <label
              style={{
                backgroundColor:
                  selectPayment === "bkash" ? design?.header_color : "#fff",
                color: selectPayment === "bkash" ? design?.text_color : "#000",
              }}
              className="py-2 px-5 rounded-lg w-full transition-colors duration-300 flex items-center cursor-pointer hover:bg-gray-100"
            >
              <input
                type="radio"
                name="payment_method"
                value="bkash"
                checked={selectPayment === "bkash"}
                onChange={(e) => setSelectPayment(e.target.value)}
                className="mr-2"
              />
              {headerSetting?.bkash_text || <img src={bkashLogo.src} className="h-8 mr-2" alt="bkashLogo" />}
            </label>
          )}

          {headerSetting?.cod === "active" && (
            <div className="flex flex-col items-start">
              <label
                style={{
                  backgroundColor:
                    selectPayment === "cod" ? design?.header_color : "#fff",
                  color: selectPayment === "cod" ? design?.text_color : "#000",
                }}
                className="py-2 px-5 rounded-lg w-full transition-colors duration-300 flex items-center cursor-pointer hover:bg-gray-100"
              >
                <input
                  type="radio"
                  name="payment_method"
                  value="cod"
                  checked={selectPayment === "cod"}
                  onChange={(e) => setSelectPayment(e.target.value)}
                  className="mr-2"
                />
                {headerSetting?.cod_text || "Cash On Delivery"}
                <FaTruck className="ml-2" />
              </label>
              {selectPayment === "cod" && (
                <p className="text-sm text-gray-600 my-3 ml-8">
                  পণ্য হাতে পেয়ে সম্পূর্ণ মূল্য পরিশোধ করতে হবে।
                </p>
              )}
            </div>
          )}

          {advancePay?.status === "1" && (
            <label
              style={{
                backgroundColor:
                  selectPayment === "ap" ? design?.header_color : "#fff",
                color: selectPayment === "ap" ? design?.text_color : "#000",
              }}
              className="py-2 px-5 rounded-lg w-full transition-colors duration-300 flex items-center cursor-pointer hover:bg-gray-100"
            >
              <input
                type="radio"
                name="payment_method"
                value="ap"
                checked={selectPayment === "ap"}
                onChange={(e) => setSelectPayment(e.target.value)}
                className="mr-2"
              />
              {headerSetting?.ap_text || "Advance Payment"}
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
