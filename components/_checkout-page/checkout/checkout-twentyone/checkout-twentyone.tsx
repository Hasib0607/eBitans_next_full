"use client";
import Skeleton from "@/components/loader/skeleton";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Address from "./address/address";
import Discount from "./discount";
import YourOrders from "./your-orders/your-order";

const CheckOutTwentyOne = () => {
  const { design, store_id, headerSetting } = useTheme();

  const [couponDis, setCouponDis] = useState(0);
  const [coupon, setCoupon] = useState(null);
  const [shipping_area, setShipping_area] = useState<any>(null);
  const [selectPayment, setSelectPayment] = useState(
    headerSetting?.cod === "active" ? "cod" : ""
  );
  const [selectAddress, setSelectAddress] = useState(null);
  const [couponResult, setCouponResult] = useState(null);
  const [loadPay, setLoadPay] = useState(false);
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userPhone, setUserPhone] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [userEmail, setUserEmail] = useState<any>(null);
  const [userNote, setUserNote] = useState<any>(null);
  const [campaign, setCampaign] = useState([]);

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
            <Skeleton />
          </div>
        )}
      </>
    );
  }

  return (
    <div
      className={`${
        design?.template_id === "34" ? "bg-thirty-one" : "bg-[#F3F4F6]"
      }`}
    >
      <div className="sm:container px-5 xl:px-24">
        <h2 className="py-10 text-4xl font-semibold text-center">
          {design?.template_id === "29" ? "চেকআউট" : "Checkout"}
        </h2>
        <div className="container">
          <div className="lg:grid lg:grid-cols-2 lg:gap-6 mt-1 py-4">
            <div className="mt-5 lg:mt-0 lg:col-span-1 lg:h-max lg:sticky lg:top-28">
              {store_id === 5368 && (
                <p className="py-1 text-lg sm:text-2xl bg-black text-white px-2">
                  অর্ডার করতে আপনার নাম, ঠিকানা,মোবাইল নাম্বার দিন। আমাদের একজন
                  প্রতিনিধি আপনাকে ফোন করে অর্ডার কনফার্ম করবে
                </p>
              )}
              <Address
                selectAddress={selectAddress}
                setSelectAddress={setSelectAddress}
                design={design}
                setToken={setToken}
                token={token}
                setUserAddress={setUserAddress}
                userPhone={userPhone}
                setUserPhone={setUserPhone}
                setUserName={setUserName}
                setUserEmail={setUserEmail}
                setUserNote={setUserNote}
              />
              <Discount
                setCouponDis={setCouponDis}
                setShipping_area={setShipping_area}
                shipping_area={shipping_area}
                setCoupon={setCoupon}
                setCouponResult={setCouponResult}
                design={design}
              />
              {/* <PaymentGateway selectPayment={selectPayment} setSelectPayment={setSelectPayment} /> */}
              {headerSetting?.online === "active" && (
                <>
                  <div>
                    I have read and agree with the website’s{" "}
                    <span>
                      <a
                        href="/terms_and_condition"
                        style={{ color: design?.header_color }}
                        className="underline"
                      >
                        Terms & Conditions
                      </a>
                    </span>
                    ,{" "}
                    <span>
                      <a
                        href="/privacy_policy"
                        style={{ color: design?.header_color }}
                        className="underline"
                      >
                        Privacy Policy
                      </a>
                    </span>{" "}
                    and{" "}
                    <span>
                      <a
                        href="/return_policy"
                        style={{ color: design?.header_color }}
                        className="underline"
                      >
                        Refund Policy
                      </a>
                    </span>
                    .
                  </div>
                </>
              )}
            </div>
            <div className="mt-5 lg:mt-0 lg:col-span-1">
              <YourOrders
                token={token}
                setLoadPay={setLoadPay}
                couponDis={couponDis}
                couponResult={couponResult}
                selectAddress={selectAddress}
                selectPayment={selectPayment}
                setSelectPayment={setSelectPayment}
                shipping_area={shipping_area}
                coupon={coupon}
                userAddress={userAddress}
                userPhone={userPhone}
                userName={userName}
                userEmail={userEmail}
                userNote={userNote}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutTwentyOne;
