"use client";
import React from "react";
import bkashLogo from "@/assets/paymentMethodLogo/bkashLogo.png";
import useTheme from "@/hooks/use-theme";
import { customizeCheckout, customizeFooter } from "@/utils/customizeDesign";

const PaymentGateway = ({ selectPayment, setSelectPayment }: any) => {
  const { design, headerSetting, module, store_id } = useTheme();
  const advancePay = module?.find((item: any) => item?.modulus_id === 106);

  const checkoutData = customizeCheckout.find((item) => item.id == store_id);
  const customizeFooter = customizeCheckout.find((item) => item.id == store_id);

  return (
    <>
      <div className="">
        <div className="mt-5">
          <div className="col-span-6 sm:col-span-4">
            <div
              className={
                checkoutData?.cash_hide
                  ? checkoutData?.cash_hide
                  : "flex justify-between items-center pb-3"
              }
            >
              <label
                htmlFor="email-address"
                className="block text-xl font-semibold text-gray-700"
              >
                {design?.template_id === "29" ? "পেমেন্ট" : "Payment"}{" "}
                <span className="text-sm">
                  ({" "}
                  {design?.template_id === "29"
                    ? "আপনার পেমেন্ট পদ্ধতি নির্বাচন করুন"
                    : "Please Select Your Payment Method."}
                  )
                </span>
              </label>
            </div>

            <div className="flex gap-2 flex-wrap">
              {headerSetting?.online === "active" && (
                <label
                  style={{
                    backgroundColor:
                      selectPayment === "online"
                        ? design?.header_color
                        : "#fff",
                    color:
                      selectPayment === "online" ? design?.text_color : "#000",
                  }}
                  className={`py-2 px-5 rounded-full space-y-2 w-full sm:w-max transition-colors duration-300 relative flex justify-between border border-gray-300`}
                >
                  <div className="flex justify-between lg:cursor-pointer">
                    <h3 className="font-semibold tracking-wider">
                      SSL Commerz
                    </h3>
                  </div>
                  <input
                    className="
                                    hidden
                                    checked:focus:bg-black
                                    checked:focus:border-black
                                    checked:focus:ring-black"
                    name="address_type"
                    type="radio"
                    value={"online"}
                    onChange={(e) => setSelectPayment(e.target.value)}
                  />
                </label>
              )}

              {headerSetting?.bkash === "active" && (
                <label
                  style={{
                    backgroundColor:
                      selectPayment === "bkash" ? design?.header_color : "#fff",
                    color:
                      selectPayment === "bkash" ? design?.text_color : "#000",
                  }}
                  className={`py-2 px-5 sm:w-40 w-full rounded-full transition-colors duration-300 relative flex justify-center border border-gray-300 lg:cursor-pointer`}
                >
                  <div className="flex justify-center ">
                    {checkoutData?.full_payment ? (
                      checkoutData?.full_payment
                    ) : (
                      <div className="flex gap-2">
                        {headerSetting?.bkash_text || (
                          <img
                            src={bkashLogo.src}
                            className="h-8 mr-2"
                            alt="bkashLogo"
                          />
                        )}
                      </div>
                    )}
                  </div>
                  <input
                    className="
                                    hidden
                                    checked:focus:bg-black
                                    checked:focus:border-black
                                    checked:focus:ring-black"
                    name="address_type"
                    type="radio"
                    value={"bkash"}
                    onChange={(e) => setSelectPayment(e.target.value)}
                  />
                </label>
              )}

              <div
                className={
                  checkoutData?.cash_hide ? checkoutData?.cash_hide : ""
                }
              >
                {headerSetting?.cod === "active" && (
                  <label
                    style={{
                      backgroundColor:
                        selectPayment === "cod" ? design?.header_color : "#fff",
                      color:
                        selectPayment === "cod" ? design?.text_color : "#000",
                    }}
                    className={`py-2 px-5 rounded-full space-y-2 sm:w-max w-full transition-colors duration-300 relative flex justify-between border border-gray-300`}
                  >
                    <div className="flex justify-between items-center lg:cursor-pointer">
                      <h3 className="font-semibold tracking-wider">
                        {headerSetting?.cod_text || "Cash On Delivery"}
                      </h3>
                    </div>

                    <input
                      className="
                                    hidden
                                    checked:focus:bg-black
                                    checked:focus:border-black
                                    checked:focus:ring-black"
                      name="address_type"
                      type="radio"
                      value={"cod"}
                      onChange={(e) => setSelectPayment(e.target.value)}
                    />
                  </label>
                )}
              </div>
              {advancePay?.status === "1" && (
                <label
                  style={{
                    backgroundColor:
                      selectPayment === "ap" ? design?.header_color : "#fff",
                    color: selectPayment === "ap" ? design?.text_color : "#000",
                  }}
                  className={`py-2 px-5 rounded-full space-y-2 sm:w-max w-full transition-colors duration-300 relative flex justify-between border border-gray-300`}
                >
                  <div className="flex justify-between items-center lg:cursor-pointer">
                    <h3 className="font-semibold tracking-wider">
                      {headerSetting?.ap_text || "Advance Payment"}
                    </h3>
                  </div>

                  <input
                    className="
                                    hidden
                                    checked:focus:bg-black
                                    checked:focus:border-black
                                    checked:focus:ring-black"
                    name="address_type"
                    type="radio"
                    value={"ap"}
                    onChange={(e) => setSelectPayment(e.target.value)}
                  />
                </label>
              )}
              {headerSetting?.amarpay === "active" && (
                <label
                  style={{
                    backgroundColor:
                      selectPayment === "amarpay"
                        ? design?.header_color
                        : "#fff",
                    color:
                      selectPayment === "amarpay" ? design?.text_color : "#000",
                  }}
                  className={`py-2 px-5 rounded-full space-y-2 sm:w-max w-full transition-colors duration-300 relative flex justify-between border border-gray-300`}
                >
                  <div className="flex justify-between items-center lg:cursor-pointer">
                    <h3 className="font-semibold tracking-wider">
                      {headerSetting?.amarpay_text || "Amar Pay"}
                    </h3>
                  </div>

                  <input
                    className="
                                    hidden
                                    checked:focus:bg-black
                                    checked:focus:border-black
                                    checked:focus:ring-black"
                    name="address_type"
                    type="radio"
                    value={"amarpay"}
                    onChange={(e) => setSelectPayment(e.target.value)}
                  />
                </label>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentGateway;
