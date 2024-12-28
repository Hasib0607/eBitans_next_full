"use client";
import useTheme from "@/hooks/use-theme";
import { btnhover } from "@/site-settings/style";
import { getDiscount } from "@/utils/get-discount";
import axiosInstance from "@/utils/http/axios/axios-instance";
import httpReq from "@/utils/http/axios/http.service";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CheckOutElevenDiscount = ({
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
    data["store_id"] = store_id;
    data["user_id"] = userData?.id;

    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const res = await httpReq.post("verifycoupon", data);
      setCouponResult(res);
      if (res.error) {
        setCouponDis(0);
        return toast(res.error, { type: "warning", autoClose: 1500 });
      }
      if (res.id) {
        const result = get_discount(res);
        setCouponDis(result);
      }
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch((er) => {
        // console.log(er);
      });
  };

  useEffect(() => {
    if (headerSetting?.shipping_area_1) {
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
      <div className="shadow sm:rounded-md sm:overflow-hidden my-5">
        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 xl:col-span-3">
              <div className="flex flex-col gap-4 items-start pb-3">
                <label
                  htmlFor="shippingArea"
                  className="block text-xl font-semibold text-gray-700"
                >
                  Shipping Area
                </label>
                <div className="flex flex-col gap-2">
                  {/* Shipping Area 1 */}
                  {headerSetting?.shipping_area_1 && (
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="shippingArea1"
                        name="shippingArea"
                        value={parseInt(headerSetting?.shipping_area_1_cost)}
                        onChange={shippingPrice}
                        className="mr-2"
                        defaultChecked
                      />
                      <label
                        htmlFor="shippingArea1"
                        className="text-lg font-semibold"
                      >
                        {headerSetting?.shipping_area_1}
                      </label>
                    </div>
                  )}

                  {/* Shipping Area 2 */}
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

                  {/* Shipping Area 3 */}
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

            {store_id !== 6433 && couponAvailable && (
              <div className="col-span-6 xl:col-span-3">
                <div className="flex flex-wrap gap-x-1 xl:justify-between items-center pb-3">
                  <label
                    htmlFor="name"
                    className="block text-xl font-semibold text-gray-700"
                  >
                    Discount
                  </label>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex gap-1 flex-wrap justify-start items-start"
                  >
                    <div className="flex flex-col">
                      <input
                        {...register("code", { required: true })}
                        type={"text"}
                        className="border border-gray-400 py-2 px-2 rounded-sm"
                      />
                      {errors.code && (
                        <span className="text-red-500">Field is empty</span>
                      )}
                    </div>
                    <input
                      type={"submit"}
                      value={"Apply"}
                      style={{
                        backgroundColor: design?.header_color,
                        color: design?.text_color,
                      }}
                      className={`px-4 py-2 font-semibold rounded-sm lg:cursor-pointer ${btnhover}`}
                    />
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOutElevenDiscount;
