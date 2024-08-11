"use client";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OvalLoader from "@/components/loader/oval-loader";

import CheckOutElevenDiscount from "./checkout-eleven-discount/checkout-eleven-discount";
import CheckOutElevenPaymentGateway from "./checkout-eleven-payment-gateway/checkout-eleven-payment-gateway";
import CheckOutElevenOrder from "./checkout-eleven-order/checkout-eleven-order";
import CheckOutElevenAddress from "./checkout-eleven-address/checkout-eleven-address";

const CheckOutEleven = () => {
  const { store_id, headerSetting } = useTheme();

  const [selectAddress, setSelectAddress] = useState<any>(null);
  const [couponDis, setCouponDis] = useState<any>(0);
  const [coupon, setCoupon] = useState<any>(null);
  const [shipping_area, setShipping_area] = useState<any>(0);
  const [selectPayment, setSelectPayment] = useState<any>(
    headerSetting?.cod === "active" ? "cod" : ""
  );
  const [couponResult, setCouponResult] = useState<any>(null);
  const [loadPay, setLoadPay] = useState<any>(false);
  const [token, setToken] = useState<any>(null);
  const [userName, setUserName] = useState<any>(null);
  const [userPhone, setUserPhone] = useState<any>(null);
  const [userAddress, setUserAddress] = useState<any>(null);
  const [campaign, setCampaign] = useState<any>([]);

  const [isButtonDisabled, setIsButtonDisabled] = useState<any>(false);

  const cartList = useSelector((state: any) => state.cart.cartList);

  useEffect(() => {
    fetchCampaignData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCampaignData = async () => {
    // get the data from the api
    const { yourData, status } = await httpReq.post(`campaign`, {
      store_id: store_id,
    });

    if (status === "200") {
      setCampaign(yourData?.campaign);
    } else {
      setCampaign([]);
    }
  };

  // free delivery

  const free = campaign?.find(
    (item: any) => item?.discount_amount === "0" && item?.status === "active"
  );
  const freeId = free?.campaignProducts?.map((item: any) => item?.id);
  const cartId = cartList?.map((item: any) => item?.id);

  const freeDelivery = cartId?.every((item: any) => freeId?.includes(item));

  useEffect(() => {
    if (freeDelivery && shipping_area) {
      setShipping_area("0");
    }
  }, [freeDelivery, campaign, cartId, shipping_area]);

  if (cartList.length === 0) {
    return (
      <>
        {!loadPay ? (
          <div className="flex justify-center items-center min-h-[70vh]">
            <div className="text-center">
              <h3 className="text-gray-400 text-2xl font-bold">
                You have no product in your cart!{" "}
              </h3>
              <h6 className="text-gray-400 text-xl font-semibold">
                Please Add Some Product
              </h6>
            </div>
          </div>
        ) : (
          <div className="h-screen w-full flex justify-center items-center relative">
            <OvalLoader />
          </div>
        )}
      </>
    );
  }

  return (
    <div className="bg-white pb-8">
      <div className="sm:container px-5 sm:py-10 py-5">
        {/* <div className=' py-2 pl-4 border-b-2 w-[50%]'>
                    <img className='w-auto h-20  sm:h-10' src={imgUrl + headerSetting?.logo} alt="" />
                </div> */}
        <div className="text-xl pt-2 font-bold text-center md:text-left ">
          Shipping Information...
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 gap gap-14">
          <div className="">
            <CheckOutElevenAddress
              selectAddress={selectAddress}
              setSelectAddress={setSelectAddress}
              setToken={setToken}
              token={token}
              setUserAddress={setUserAddress}
              userPhone={userPhone}
              setUserPhone={setUserPhone}
              setUserName={setUserName}
              isButtonDisabled={isButtonDisabled}
              setIsButtonDisabled={setIsButtonDisabled}
            />
            <CheckOutElevenDiscount
              setCouponDis={setCouponDis}
              setShipping_area={setShipping_area}
              setCoupon={setCoupon}
              setCouponResult={setCouponResult}
            />
            <CheckOutElevenPaymentGateway
              selectPayment={selectPayment}
              setSelectPayment={setSelectPayment}
            />
          </div>
          <div className="border-l-2 pl-8">
            <CheckOutElevenOrder
              token={token}
              campaign={campaign}
              setLoadPay={setLoadPay}
              couponDis={couponDis}
              couponResult={couponResult}
              selectAddress={selectAddress}
              selectPayment={selectPayment}
              shipping_area={shipping_area}
              coupon={coupon}
              userAddress={userAddress}
              userPhone={userPhone}
              userName={userName}
              isButtonDisabled={isButtonDisabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutEleven;
