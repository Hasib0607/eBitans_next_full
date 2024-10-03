"use client";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OvalLoader from "@/components/loader/oval-loader";
import Booking from "@/components/booking";
import CheckOutFortyAddress from "./address/checkout-forty-address";
import CheckOutFortyDiscount from "./discount/checkout-forty-discount";
import CheckOutFortyPaymentGateway from "./payment/checkout-forty-payment-gateway";
import CheckOutFortyOrder from "./order/checkout-forty-order";
// import Booking from '../../"@/components/booking/Booking';

const CheckOutForty = () => {
  const { store_id, bookingData } = useTheme();

  const [selectAddress, setSelectAddress] = useState(null);
  const [couponDis, setCouponDis] = useState(0);
  const [coupon, setCoupon] = useState(null);
  const [shipping_area, setShipping_area] = useState<any>(0);
  const [selectPayment, setSelectPayment] = useState(null);
  const [couponResult, setCouponResult] = useState(null);
  const [loadPay, setLoadPay] = useState(false);
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userPhone, setUserPhone] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [campaign, setCampaign] = useState([]);
  const [formBookData, setFormBookData] = useState({
    name: "",
    email: "",
    phone: "",
    specificDate: "",
    startDate: "",
    endDate: "",
    time: "",
    comment: "",
    pickupLocation: "",
    dropLocation: "",
  });

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

  const free: any = campaign?.find(
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
    <div className="container lg:px-28 px-5 mt-10">
      <div className="text-center pb-5">
        <h1 className="text-2xl uppercase">Checkout</h1>
      </div>
      <div className="lg:grid lg:grid-cols-3 lg:gap-6 mt-1 py-4 px-2">
        <div className="mt-5 lg:mt-0 lg:col-span-2">
          {bookingData?.status === 200 && (
            <Booking
              formBookData={formBookData}
              setFormBookData={setFormBookData}
            />
          )}
          {bookingData?.status !== 200 && (
            <CheckOutFortyAddress
              selectAddress={selectAddress}
              setSelectAddress={setSelectAddress}
              setToken={setToken}
              token={token}
              setUserAddress={setUserAddress}
              userPhone={userPhone}
              setUserPhone={setUserPhone}
              setUserName={setUserName}
            />
          )}
          <CheckOutFortyDiscount
            setCouponDis={setCouponDis}
            setShipping_area={setShipping_area}
            setCoupon={setCoupon}
            setCouponResult={setCouponResult}
            bookingData={bookingData}
          />
          <CheckOutFortyPaymentGateway
            selectPayment={selectPayment}
            setSelectPayment={setSelectPayment}
          />
        </div>

        <div className="mt-5 lg:mt-0 lg:col-span-1">
          <CheckOutFortyOrder
            token={token}
            formBookData={formBookData}
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

export default CheckOutForty;
