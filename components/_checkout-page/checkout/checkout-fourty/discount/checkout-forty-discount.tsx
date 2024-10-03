import useTheme from "@/hooks/use-theme";
import { btnhover } from "@/site-settings/style";
import { getDiscount } from "@/utils/get-discount";
import httpReq from "@/utils/http/axios/http.service";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CheckOutFortyDiscount = ({
  setCouponDis,
  setShipping_area,
  setCoupon,
  setCouponResult,
  bookingData,
}: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { store_id, design, headerSetting, userData } = useTheme();
  const cartList = useSelector((state: any) => state.cart.cartList);

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
        // setLoad(false)
        // console.log(er);
      });
  };

  useEffect(() => {
    if (headerSetting?.shipping_area_1 && store_id === 1693) {
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
      <div className="overflow-hidden my-5">
        <div className="px-4 py-5 bg-[#F4F4F4] space-y-6 sm:p-6">
          <div className="">
            {bookingData?.status !== 200 && (
              <div className="pb-3">
                <label
                  htmlFor="name"
                  className="block sm:text-xl text-base font-semibold text-gray-700 pb-2"
                >
                  Shipping Area{" "}
                  <span className="text-sm">
                    ( Please Select Your Shipping Area )
                  </span>
                </label>
                <div className="max-w-full w-52">
                  <select
                    onChange={shippingPrice}
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="mt-1 block sm:w-full max-w-full w-52 py-2 font-semibold border capitalize border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  >
                    <option value={""}>--Select Area--</option>
                    {headerSetting?.shipping_area_1 && (
                      <option
                        value={parseInt(headerSetting?.shipping_area_1_cost)}
                      >
                        {headerSetting?.shipping_area_1}
                      </option>
                    )}
                    {headerSetting?.shipping_area_2 && (
                      <option
                        value={parseInt(headerSetting?.shipping_area_2_cost)}
                      >
                        {headerSetting?.shipping_area_2}
                      </option>
                    )}
                    {headerSetting?.shipping_area_3 && (
                      <option
                        value={parseInt(headerSetting?.shipping_area_3_cost)}
                      >
                        {headerSetting?.shipping_area_3}
                      </option>
                    )}
                  </select>
                </div>
              </div>
            )}

            <div className="pb-3">
              <label
                htmlFor="name"
                className="block sm:text-xl font-semibold text-gray-700 pb-2"
              >
                Discount
              </label>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-start gap-y-2"
              >
                <div className="flex flex-col justify-center">
                  <input
                    {...register("code", { required: true })}
                    type={"text"}
                    className="border border-gray-400 py-1 px-2 rounded-sm w-full"
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
                  className={`px-4 py-0.5 ml-2 font-semibold rounded-sm lg:cursor-pointer text-lg ${btnhover}`}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOutFortyDiscount;
