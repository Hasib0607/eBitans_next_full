"use client";
import useTheme from "@/hooks/use-theme";
import { btnhover } from "@/site-settings/style";
import { customizeCheckout } from "@/utils/customizeDesign";
import { getDiscount } from "@/utils/get-discount";
import axiosInstance from "@/utils/http/axios/axios-instance";
import httpReq from "@/utils/http/axios/http.service";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { RotatingLines } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Discount = ({
  setCouponDis,
  setShipping_area,
  setCoupon,
  setCouponResult,
}: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { store_id, design, headerSetting, userData } = useTheme();
  const cartList = useSelector((state: any) => state.cart.cartList);
  const customizeCheckoutData = customizeCheckout.find(
    (item) => item.id == store_id
  );
  const [loading, setLoading] = useState(false);

  const [couponAvailable, setCouponAvailable] = useState(false);

  useEffect(() => {
    axiosInstance
      .post("/check/coupon-is-available", { store_id })
      .then((response) => {
        setCouponAvailable(response?.data?.status || false);
      });
  }, [store_id]);

  const get_discount = (res: any) => {
    setCoupon(res?.code);
    const priceList = cartList?.map((p: any) => p.qty * p?.price);
    let total = priceList.reduce(
      (previousValue: any, currentValue: any) => previousValue + currentValue,
      0
    );
    if (res?.max_purchase >= total && res?.min_purchase <= total) {
      const result: any = getDiscount(
        total,
        res?.discount_amount,
        res?.discount_type
      );
      const dis = total - result;
      toast("Successfully Apply Coupon", {
        type: "success",
        autoClose: 1000,
      });
      return Number(dis);
    } else if (!res?.max_purchase && res?.min_purchase <= total) {
      const result: any = getDiscount(
        total,
        res?.discount_amount,
        res?.discount_type
      );
      const dis = total - result;
      toast("Successfully Apply Coupon", {
        type: "success",
        autoClose: 1000,
      });
      return Number(dis);
    } else {
      // alert(`Please purchase minimum ${res?.min_purchase}tk to maximum ${res?.max_purchase }tk`);
      toast(
        `Please purchase minimum ${res?.min_purchase}tk ${
          res?.max_purchase && `to maximum ${res?.max_purchase}tk`
        }`,
        {
          type: "warning",
          autoClose: 1500,
        }
      );
      return null;
    }
  };
  const onSubmit = (data: any) => {
    setLoading(true);
    data["store_id"] = store_id;
    data["user_id"] = userData?.id;
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const res = await httpReq.post("verifycoupon", data);
      setCouponResult(res);
      if (res.error) {
        setCouponDis(0);
        setLoading(false);
        return toast(res.error, { type: "warning", autoClose: 1500 });
      }
      if (res.id) {
        const result = get_discount(res);
        setCouponDis(result);
        setLoading(false);
      }
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch((er) => {
        // setLoad(false)
        console.log(er);
      });
  };

  useEffect(() => {
    if (
      headerSetting?.shipping_area_1 &&
      (store_id === 3601 || store_id === 3904 || store_id === 5519)
    ) {
      setShipping_area(parseInt(headerSetting?.shipping_area_1_cost));
    }
  }, [
    headerSetting?.shipping_area_1,
    headerSetting?.shipping_area_1_cost,
    setShipping_area,
    store_id,
  ]);

  const shippingPrice = (e: any) => {
    setShipping_area(e.target.value);
  };

  return (
    <>
      <div
        className={`${
          design?.template_id === "34"
            ? "bg-thirty-one border border-white"
            : "bg-white"
        }  shadow sm:rounded-md sm:overflow-hidden my-5`}
      >
        <div className={`px-4 py-5  space-y-6 sm:p-6`}>
          <div className="grid grid-cols-1 gap-6">
            <div
              className={
                customizeCheckoutData?.cash_hide
                  ? customizeCheckoutData?.cash_hide
                  : ""
              }
            >
              <div className="flex flex-col justify-start gap-4 items-start pb-3">
                <label
                  htmlFor="name"
                  className="block text-xl font-semibold text-gray-700"
                >
                  কুরিয়ার চার্জ
                </label>
                <div className="flex flex-col gap-2">
                  {/* Radio button for Shipping Area 1 */}
                  {headerSetting?.shipping_area_1 && (
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="shippingArea1"
                        name="shippingArea"
                        value={parseInt(headerSetting?.shipping_area_1_cost)}
                        onChange={shippingPrice}
                        // checked={
                        //   store_id === 3601 ||
                        //   store_id === 3904 ||
                        //   store_id === 5519 ||
                        // }
                        defaultChecked={
                          customizeCheckoutData?.checked
                            ? customizeCheckoutData?.checked
                            : false
                        }
                        className="mr-2"
                      />
                      <label
                        htmlFor="shippingArea1"
                        className="text-lg font-semibold"
                      >
                        {headerSetting?.shipping_area_1}
                      </label>
                    </div>
                  )}

                  {/* Radio button for Shipping Area 2 */}
                  {headerSetting?.shipping_area_2 && (
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="shippingArea2"
                        name="shippingArea"
                        value={parseInt(headerSetting?.shipping_area_2_cost)}
                        onChange={shippingPrice}
                        className="mr-2"
                      />
                      <label
                        htmlFor="shippingArea2"
                        className="text-lg font-semibold"
                      >
                        {headerSetting?.shipping_area_2}
                      </label>
                    </div>
                  )}

                  {/* Radio button for Shipping Area 3 */}
                  {headerSetting?.shipping_area_3 && (
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="shippingArea3"
                        name="shippingArea"
                        value={parseInt(headerSetting?.shipping_area_3_cost)}
                        onChange={shippingPrice}
                        className="mr-2"
                      />
                      <label
                        htmlFor="shippingArea3"
                        className="text-lg font-semibold"
                      >
                        {headerSetting?.shipping_area_3}
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {couponAvailable && (
              <div className="">
                <div className="flex sm:flex-row flex-col gap-4 items-start sm:items-center pb-3 ">
                  <label
                    htmlFor="name"
                    className="block text-xl font-semibold text-gray-700"
                  >
                     ডিসকাউন্ট
                  </label>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-wrap gap-2 justify-center items-start"
                  >
                    <div className="flex flex-col justify-center">
                      <input
                        {...register("code", { required: true })}
                        type={"text"}
                        className="border border-gray-400 text-black py-2 px-2 rounded-sm"
                      />
                      {errors.code && (
                        <span className="text-red-500">Field is empty</span>
                      )}
                    </div>
                    {loading ? (
                      <div
                        style={{
                          backgroundColor: design?.header_color,
                          color: design?.text_color,
                        }}
                        className={`flex justify-center items-center py-2 w-20 font-semibold rounded-sm text-lg lg:cursor-pointer ${btnhover}`}
                      >
                        <RotatingLines
                          width="25"
                          strokeColor="#6495ED"
                          strokeWidth="6"
                        />
                        <input type={"submit"} value={""} />
                      </div>
                    ) : (
                      <input
                        type={"submit"}
                        value={"অ্যাপ্লাই"}
                        style={{
                          backgroundColor: design?.header_color,
                          color: design?.text_color,
                        }}
                        className={`w-20 py-2 font-semibold rounded-sm text-lg lg:cursor-pointer  ${btnhover}`}
                      />
                    )}
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
        {store_id === 5377 && (
          <div className="px-4 pb-10 space-y-2">
            <p className="text-red-600 text-sm font-bold">
              <FaRegArrowAltCircleRight className="inline mr-1 text-xl" />{" "}
              এডভান্স পেমেন্ট আবশ্যক (ফেক অর্ডার প্রতিরোধ করতে) আমাদের গ্যাজেট
              আইটেম গুলো অর্ডারের ক্ষেত্রে আংশিক পেমেন্ট করতে হয়। Cash On
              Delivery (COD) এর ক্ষেত্রে অবশ্যই প্রতি অর্ডারে ২০০৳ - ১০০০৳ টাকা
              প্রদান করতে হয়। যদি চান ফুল পেমেন্ট ও করতে পারবেন।
            </p>
            <p className="text-red-600 text-sm font-bold">
              <FaRegArrowAltCircleRight className="inline mr-1 text-xl" /> আপনার
              প্রদানকৃত এডভান্স টাকা টোটাল বিল থেকে মাইনাস করা হবে। বাকি টাকা
              ডেলিভারি ম্যানকে দিয়ে পন্য বুঝে নিবেন।
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Discount;
