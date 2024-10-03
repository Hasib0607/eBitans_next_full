"use client";
import React from "react";
import bkashLogo from "@/assets/paymentMethodLogo/bkashLogo.png";
import useTheme from "@/hooks/use-theme";

const PaymentGateway = ({ selectPayment, setSelectPayment }: any) => {
  const { design, headerSetting, module, store_id } = useTheme();
  const advancePay = module?.find((item: any) => item?.modulus_id === 106);

  return (
    <>
      <div className="">
        <div className="mt-5">
          <div className="col-span-6 sm:col-span-4">
            <div className="flex justify-between items-center pb-3">
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
                  className={`py-2 px-5 sm:w-40 w-full rounded-full transition-colors duration-300 relative flex justify-center border border-gray-300 lg:cursor-pointer`}
                >
                  <div className="flex justify-center ">
                    <div className="flex gap-2">
                      <img
                        src={bkashLogo.src}
                        className=" h-8 "
                        alt="bkashLogo"
                      />
                      {/* <h3 className='font-semibold tracking-wider'>{"Bkash Payment"}</h3> */}
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
                  className={`py-2 px-5 rounded-full space-y-2 sm:w-max w-full transition-colors duration-300 relative flex justify-between border border-gray-300`}
                >
                  <div className="flex justify-between items-center lg:cursor-pointer">
                    <h3 className="font-semibold tracking-wider">
                      {design?.template_id === "29"
                        ? "ক্যাশ অন ডেলিভারি"
                        : `${
                            store_id === 3020
                              ? "Advanced Personal"
                              : "Cash On Delivery"
                          }`}
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
                  className={`py-2 px-5 rounded-full space-y-2 sm:w-max w-full transition-colors duration-300 relative flex justify-between border border-gray-300`}
                >
                  <div className="flex justify-between items-center lg:cursor-pointer">
                    <h3 className="font-semibold tracking-wider">
                      {design?.template_id === "29"
                        ? "অ্যাডভান্স পেমেন্ট"
                        : `${
                            store_id === 3020
                              ? "Bkash Advance Payment"
                              : "Advance Payment"
                          }`}
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
