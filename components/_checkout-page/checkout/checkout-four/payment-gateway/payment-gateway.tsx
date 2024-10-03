"use client";
import React from "react";
import bkashLogo from "@/assets/paymentMethodLogo/bkashLogo.png";
import useTheme from "@/hooks/use-theme";

const PaymentGateway = ({ selectPayment, setSelectPayment }: any) => {
  const { design, headerSetting, module, store_id } = useTheme();
  const advancePay = module?.find((item: any) => item?.modulus_id === 106);

  return (
    <>
      <div className="shadow sm:rounded-md sm:overflow-hidden my-5">
        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div className="col-span-6 sm:col-span-4">
            <div className="flex justify-between items-center pb-3">
              <label
                htmlFor="email-address"
                className="block text-xl font-semibold text-gray-700"
              >
                Payment{" "}
                <span className="text-sm">
                  ( Please Select Your Payment Method )
                </span>
              </label>
            </div>
            {store_id === 3274 && (
              <div className="mb-2 text-sm text-red-500">
                <h1>
                  অর্ডার কনফার্ম করতে ডেলিভারি চার্জ বিকাশে সেন্ড মানি করুন।
                  রেফেরেন্সে আপনার অর্ডার নাম্বারটি দিন।{" "}
                </h1>
                <p>
                  বিকাশ : <span className="font-bold">01867255123</span>{" "}
                  (personal).
                </p>
              </div>
            )}

            <div className="flex gap-2 flex-wrap ">
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
                  className={`p-5 rounded space-y-2 w-max transition-colors duration-300 relative flex justify-between border border-gray-300`}
                >
                  <div className="flex justify-between lg:cursor-pointer">
                    <h3 className="font-semibold tracking-wider">
                      {"SSL Commerz"}
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
                  className={`p-5 rounded space-y-2 w-60 transition-colors duration-300 relative flex justify-center border border-gray-300 lg:cursor-pointer`}
                >
                  <div className="flex justify-center ">
                    <div>
                      <img
                        src={bkashLogo.src}
                        className=" max-h-8 "
                        alt="bkashLogo"
                      />
                    </div>
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

              {headerSetting?.cod === "active" && (
                <label
                  style={{
                    backgroundColor:
                      selectPayment === "cod" ? design?.header_color : "#fff",
                    color:
                      selectPayment === "cod" ? design?.text_color : "#000",
                  }}
                  className={`p-5 rounded space-y-2 w-max transition-colors duration-300 relative flex justify-between border border-gray-300`}
                >
                  <div className="flex justify-between lg:cursor-pointer">
                    <h3 className="font-semibold tracking-wider">
                      {"Cash On Delivery"}
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

              {advancePay?.status === "1" && (
                <label
                  style={{
                    backgroundColor:
                      selectPayment === "ap" ? design?.header_color : "#fff",
                    color: selectPayment === "ap" ? design?.text_color : "#000",
                  }}
                  className={`p-5 rounded space-y-2 w-max transition-colors duration-300 relative flex justify-between border border-gray-300`}
                >
                  <div className="flex justify-between lg:cursor-pointer">
                    <h3 className="font-semibold tracking-wider">
                      {"Advance Payment"}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentGateway;
