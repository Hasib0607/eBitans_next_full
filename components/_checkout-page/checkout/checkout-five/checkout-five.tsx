"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./checkoutfive.css";
import CheckOutFiveAddress from "./checkout-five-address/checkout-five-address";
import CheckOutFiveDiscount from "./checkout-five-discount/checkout-five-discount";
import CheckOutFiveOrder from "./checkout-five-order/checkout-five-order";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import OvalLoader from "@/components/loader/oval-loader";
import CheckOutFivePaymentGateway from "./checkout-five-payment-gateway/checkout-five-payment-gateway";

const CheckOutsFive = () => {
  const { store_id } = useTheme();

  const [selectAddress, setSelectAddress] = useState<any>(null);
  const [couponDis, setCouponDis] = useState<any>(0);
  const [coupon, setCoupon] = useState<any>(null);
  const [shipping_area, setShipping_area] = useState<any>(0);
  const [selectPayment, setSelectPayment] = useState<any>(null);
  const [couponResult, setCouponResult] = useState<any>(null);
  const [loadPay, setLoadPay] = useState<any>(false);
  const [token, setToken] = useState<any>(null);
  const [userName, setUserName] = useState<any>(null);
  const [userPhone, setUserPhone] = useState<any>(null);
  const [userAddress, setUserAddress] = useState<any>(null);
  const [campaign, setCampaign] = useState<any>([]);

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
    <div className="container">
      <div className="text-center pb-5">
        <h1 className="text-4xl font-bold">Checkout</h1>
      </div>
      <div className="lg:grid lg:grid-cols-3 lg:gap-6 mt-1 py-4 px-2">
        <div className="CheckOutFiveBorderShadow mt-5 lg:mt-0 lg:col-span-2">
          <CheckOutFiveAddress
            selectAddress={selectAddress}
            setSelectAddress={setSelectAddress}
            setToken={setToken}
            token={token}
            setUserAddress={setUserAddress}
            setUserPhone={setUserPhone}
            setUserName={setUserName}
          />
          <CheckOutFiveDiscount
            setCouponDis={setCouponDis}
            setShipping_area={setShipping_area}
            setCoupon={setCoupon}
            setCouponResult={setCouponResult}
          />
          <CheckOutFivePaymentGateway
            selectPayment={selectPayment}
            setSelectPayment={setSelectPayment}
          />
        </div>

        <div className="mt-5 lg:mt-0 lg:col-span-1">
          <CheckOutFiveOrder
            token={token}
            setLoadPay={setLoadPay}
            couponResult={couponResult}
            couponDis={couponDis}
            selectAddress={selectAddress}
            selectPayment={selectPayment}
            shipping_area={shipping_area}
            coupon={coupon}
            userAddress={userAddress}
            userPhone={userPhone}
            userName={userName}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckOutsFive;
