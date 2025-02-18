"use client";
import React from "react";
import bkashLogo from "@/assets/paymentMethodLogo/bkashLogo.png";
import useTheme from "@/hooks/use-theme";

const CheckOutElevenPaymentGateway = ({
  selectPayment,
  setSelectPayment,
}: any) => {
  const { design, headerSetting, module, store_id } = useTheme();
  const advancePay = module?.find((item: any) => item?.modulus_id === 106);

  return (
    <>
      <div className="shadow sm:rounded-md sm:overflow-hidden my-5">
        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div className="col-span-6 sm:col-span-4">
            <div className="flex flex-col gap-2 justify-between pb-3">
              <label
                htmlFor="email-address"
                className="block text-xl font-semibold text-gray-700"
              >
                Payment{" "}
                <span className="text-sm">
                  ( Please Select Your Payment Method )
                </span>
              </label>
              {store_id === 4736 && (
                <label
                  htmlFor="email-address"
                  className="block text-sm bg-black text-white font-semibold p-2 rounded-md"
                >
                  ১৫০ টাকা এডভ্যান্স পেমেন্ট করতে এই বক্স এ ক্লিক করুন
                </label>
              )}
              {store_id === 4812 && (
                <label
                  htmlFor="email-address"
                  className="block text-sm bg-black text-white font-semibold p-2 rounded-md"
                >
                  ২০০ টাকা অগ্ৰীম পেমেন্ট অথবা সম্পূর্ণ পেমেন্ট করে আপনার
                  অর্ডারটি নিশ্চিত করুন।
                </label>
              )}
            </div>

            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
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
                  className={`p-5 rounded space-y-2 w-full transition-colors duration-300 relative flex justify-between border border-gray-300`}
                >
                  <div className="flex justify-between lg:cursor-pointer">
                    <h3 className="font-semibold tracking-wider">
                      {"SSL Commarce"}
                    </h3>
                  </div>
                  <input
                    className=" hidden checked:focus:bg-black checked:focus:border-black checked:focus:ring-black"
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
                  className={`p-5 rounded space-y-2 w-full transition-colors duration-300 relative flex justify-center border border-gray-300 lg:cursor-pointer`}
                >
                  <div className="flex justify-center ">
                    <div>
                      {headerSetting?.bkash_text || (
                        <img
                          src={bkashLogo.src}
                          className=" max-h-8 "
                          alt="bkashLogo"
                        />
                      )}
                    </div>
                  </div>
                  <input
                    className="hidden checked:focus:bg-black checked:focus:border-black checked:focus:ring-black"
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
                  className={`p-5 rounded space-y-2 w-full transition-colors duration-300 relative flex justify-between border border-gray-300`}
                >
                  <div className="flex justify-between lg:cursor-pointer">
                    <h3 className="font-semibold tracking-wider">
                      {headerSetting?.cod_text || "Cash On Delivery"}
                    </h3>
                  </div>

                  <input
                    className="hidden checked:focus:bg-black checked:focus:border-black checked:focus:ring-black"
                    name="address_type"
                    type="radio"
                    value={"cod"}
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
                  className={`p-5 rounded space-y-2 w-full transition-colors duration-300 relative flex justify-between border border-gray-300`}
                >
                  <div className="flex justify-between lg:cursor-pointer">
                    <h3 className="font-semibold tracking-wider">
                      {headerSetting?.amarpay_text || "Amar Pay"}
                    </h3>
                  </div>

                  <input
                    className="hidden checked:focus:bg-black checked:focus:border-black checked:focus:ring-black"
                    name="address_type"
                    type="radio"
                    value={"amarpay"}
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
                  className={`p-5 rounded space-y-2 w-full transition-colors duration-300 relative flex justify-between border border-gray-300`}
                >
                  <div className="flex justify-between lg:cursor-pointer">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOutElevenPaymentGateway;
