"use client";
import axios from "axios";
import React, { useState } from "react";
// import { getPrice } from '../../../services/utils';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import useTheme from "@/hooks/use-theme";
import { useRouter } from "next/navigation";
import { login } from "@/redux/features/auth.slice";
import httpReq from "../utils/http/axios/http.service";

const BookingForm = ({
  product,
  setOpen,
  open,
  color,
  size,
  unit,
  variant,
  qty,
  price,
}: any) => {
  const router = useRouter();
  const { store_id, bookingData, store, setOrderPlaced } = useTheme();

  const { user } = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
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

  // const price = parseInt(getPrice(product?.regular_price, product?.discount_price, product?.discount_type))

  const priceUpdate =
    price -
    (variant?.length > 0
      ? unit?.additional_price ||
        size?.additional_price ||
        color?.additional_price
      : 0);

  const cart: any = [
    {
      id: product?.id,
      price: priceUpdate,
      quantity: qty,
      color: color ? color?.color : null,
      size: size ? size?.size : null,
      additional_price:
        variant?.length > 0
          ? unit?.additional_price ||
            size?.additional_price ||
            color?.additional_price
          : null,
      unit: unit ? unit?.unit : null,
      volume: unit ? unit?.volume : null,
    },
  ];

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormBookData({
      ...formBookData,
      [name]: value,
    });
  };

  const apiOrder = "https://admin.ebitans.com/api/v1/placeorder";

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    for (let i = 0; i < cart.length; i++) {
      // Append all non-image properties of the cart item
      for (let key in cart[i]) {
        if (key !== "items") {
          formData.append(`product[${i}][${key}]`, cart[i][key]);
        }
      }
    }

    formData.append("store_id", store_id);
    formData.append("name", formBookData?.name);
    formData.append("phone", formBookData?.phone);
    formData.append("email", formBookData?.email);
    formData.append("date", formBookData?.specificDate);
    formData.append("start_date", formBookData?.startDate);
    formData.append("end_date", formBookData?.endDate);
    formData.append("pickup_location", formBookData?.pickupLocation);
    formData.append("drop_location", formBookData?.dropLocation);
    formData.append("comment", formBookData?.comment);
    formData.append("time", formBookData?.time);
    // formData.append(
    //   "from_type",
    //   bookingData?.from_type === "single"
    //     ? 1
    //     : bookingData?.from_type === "double"
    //     ? 0
    //     : 10
    // );
    formData.append("subtotal", price);
    formData.append("shipping", "0");
    formData.append("total", price);
    formData.append("discount", "0");
    formData.append("tax", "0");

    // console.log(responseInfo);

    if (store?.auth_type === "EasyOrder" && !user) {
      const dataInfo = {
        name: formBookData?.name,
        phone: formBookData?.phone,
        store_id: store_id,
      };
      const responseInfo = await axios.post(
        "https://admin.ebitans.com/api/v1/address/easy-order/save",
        dataInfo
      );
      // console.log(responseInfo, "responseInfo");
      const placeOrder = async () => {
        try {
          const response = await axios.post(apiOrder, formData, {
            headers: {
              Authorization: `Bearer ${responseInfo?.data?.token?.token}`,
              "Content-Type": "application/json", // Adjust the content type according to your API requirements
            },
          });

          if (response?.data) {
            if (!response?.data?.url && !response?.data?.error) {
              toast(
                `Your #${response?.data?.order?.reference_no} order complete successfully!`,
                {
                  type: "success",
                  autoClose: 1000,
                }
              );
              setOpen(!open);
              setFormBookData({
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
              setLoading(false);
              dispatch(login({ tokenData: responseInfo?.data?.token }) as any)
                .unwrap()
                .then(({ verify, error }: any) => {
                  if (error) {
                    toast(error, { type: "error" });
                    router.push("/login");
                  }
                  if (verify) {
                    toast(verify, { type: "success" });
                    // window.location.replace("/profile");
                    setOrderPlaced(true);
                    router.push("/thank-you");
                  }
                })
                .catch((er: any) => {
                  toast("Credential Doesn't Match", { type: "error" });
                });
            }
            if (response?.data?.error) {
              toast(response?.data?.error, {
                type: "error",
                autoClose: 1000,
              });
              setLoading(false);
            }
          }
          if (response?.data?.user) {
            // localStorage.setItem("user", JSON.stringify(response.user));
          }
        } catch (error) {
          // console.error('Error posting data:', error);
          // Handle any errors here
        }
      };

      // Call the function whenever you want to post data with the token
      placeOrder();
    } else {
      httpReq
        .post(`placeorder`, formData)
        .then((response: any) => {
          if (response) {
            if (!response?.url && !response?.error) {
              toast(
                `Your #${response?.order?.reference_no} order complete successfully!`,
                {
                  type: "success",
                  autoClose: 1000,
                }
              );
              setOpen(!open);
              setFormBookData({
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
              setLoading(false);
              setOrderPlaced(true);
              router.push("/thank-you");
            }
            if (response?.error) {
              toast(response?.error, {
                type: "error",
                autoClose: 1000,
              });
              setLoading(false);
            }
          }
          if (response?.user) {
            // localStorage.setItem("user", JSON.stringify(response.user));
          }
        })
        .catch((error) => {
          const { errors, message } = error.response.data;
          console.log(errors);
          console.log(message);
          // error.response.data?.errors.map(i => alert.show(i.message, { type: 'error' }))
        });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 max-w-[500px] min-w-[300px] mx-auto"
    >
      <h1 className="text-center text-2xl">Booking Information</h1>
      {bookingData?.data?.map((item: any) => (
        <div className="flex flex-col" key={item?.id}>
          {item?.field_name === "name" && (
            <div className="flex flex-col ">
              <label>
                {item?.c_name}{" "}
                <span className="text-red-500">
                  {item?.requirement_status === "required" && "*"}
                </span>
              </label>
              <input
                required={item?.requirement_status === "required" && true}
                type="text"
                name="name"
                value={formBookData.name}
                onChange={handleChange}
                className="focus:outline-none focus:ring-0 focus:border-gray-400 border border-gray-400 rounded-md text-sm"
              />
            </div>
          )}
          {item?.field_name === "phone" && (
            <div className="flex flex-col ">
              <label>
                {item?.c_name}{" "}
                <span className="text-red-500">
                  {item?.requirement_status === "required" && "*"}
                </span>
              </label>
              <div className="flex items-center w-full">
                <p className="border-y border-l py-2 border-gray-400 rounded-l-md px-2 bg-gray-400">
                  +88
                </p>
                <input
                  required={item?.requirement_status === "required" && true}
                  maxLength={11}
                  minLength={11}
                  type="tel"
                  name="phone"
                  value={formBookData.phone}
                  onChange={handleChange}
                  className="focus:outline-none focus:ring-0 focus:border-gray-400 border-l-0 border border-gray-400 rounded-r-md w-full"
                />
              </div>
            </div>
          )}
          {item?.field_name === "email" && (
            <div className="flex flex-col ">
              <label>
                {item?.c_name}{" "}
                <span className="text-red-500">
                  {item?.requirement_status === "required" && "*"}
                </span>
              </label>
              <input
                required={item?.requirement_status === "required" && true}
                type="email"
                name="email"
                value={formBookData.email}
                onChange={handleChange}
                className="focus:outline-none focus:ring-0 focus:border-gray-400 border border-gray-400 rounded-md text-sm"
              />
            </div>
          )}
          {item?.field_name === "date" && (
            <div className="flex flex-col ">
              <label>
                {item?.c_name}{" "}
                <span className="text-red-500">
                  {item?.requirement_status === "required" && "*"}
                </span>
              </label>
              <input
                required={item?.requirement_status === "required" && true}
                type="date"
                name="specificDate"
                value={formBookData.specificDate}
                onChange={handleChange}
                className="focus:outline-none focus:ring-0 focus:border-gray-400 border border-gray-400 rounded-md text-sm"
              />
            </div>
          )}
          {item?.field_name === "date range" && (
            <div>
              <h1>{item?.c_name}</h1>
              <div className="flex justify-between flex-wrap gap-3 mt-3">
                <div className="flex flex-col ">
                  <label>
                    Start Date{" "}
                    <span className="text-red-500">
                      {item?.requirement_status === "required" && "*"}
                    </span>
                  </label>
                  <input
                    required={item?.requirement_status === "required" && true}
                    type="date"
                    name="startDate"
                    value={formBookData.startDate}
                    onChange={handleChange}
                    className="focus:outline-none focus:ring-0 focus:border-gray-400 border border-gray-400 rounded-md text-sm"
                  />
                </div>
                <div className="flex flex-col ">
                  <label>
                    End Date{" "}
                    <span className="text-red-500">
                      {item?.requirement_status === "required" && "*"}
                    </span>
                  </label>
                  <input
                    required={item?.requirement_status === "required" && true}
                    type="date"
                    name="endDate"
                    value={formBookData.endDate}
                    onChange={handleChange}
                    className="focus:outline-none focus:ring-0 focus:border-gray-400 border border-gray-400 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>
          )}
          {item?.field_name === "location range" && (
            <div>
              <h1>{item?.c_name}</h1>
              <div className="flex justify-between flex-wrap gap-3 mt-3">
                <div className="flex flex-col ">
                  <label>
                    Pickup Location{" "}
                    <span className="text-red-500">
                      {item?.requirement_status === "required" && "*"}
                    </span>
                  </label>
                  <input
                    required={item?.requirement_status === "required" && true}
                    type="text"
                    name="pickupLocation"
                    value={formBookData.pickupLocation}
                    onChange={handleChange}
                    className="focus:outline-none focus:ring-0 focus:border-gray-400 border border-gray-400 rounded-md text-sm"
                  />
                </div>
                <div className="flex flex-col ">
                  <label>
                    Drop Location{" "}
                    <span className="text-red-500">
                      {item?.requirement_status === "required" && "*"}
                    </span>
                  </label>
                  <input
                    required={item?.requirement_status === "required" && true}
                    type="text"
                    name="dropLocation"
                    value={formBookData.dropLocation}
                    onChange={handleChange}
                    className="focus:outline-none focus:ring-0 focus:border-gray-400 border border-gray-400 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>
          )}
          {item?.field_name === "time" && (
            <div className="flex flex-col mt-3">
              <label>
                {item?.c_name}{" "}
                <span className="text-red-500">
                  {item?.requirement_status === "required" && "*"}
                </span>
              </label>
              <input
                required={item?.requirement_status === "required" && true}
                type="time"
                name="time"
                value={formBookData.time}
                onChange={handleChange}
                className="focus:outline-none focus:ring-0 focus:border-gray-400 border border-gray-400 rounded-md text-sm"
              />
            </div>
          )}
          {item?.field_name === "comment" && (
            <div className="flex flex-col ">
              <label>
                {item?.c_name}{" "}
                <span className="text-red-500">
                  {item?.requirement_status === "required" && "*"}
                </span>
              </label>
              <textarea
                required={item?.requirement_status === "required" && true}
                name="comment"
                value={formBookData.comment}
                onChange={handleChange}
                className="focus:outline-none focus:ring-0 focus:border-gray-400 border border-gray-400 rounded-md text-sm"
              />
            </div>
          )}
        </div>
      ))}

      {loading ? (
        <button className="bg-orange-500 rounded-md py-3 text-xl text-white">
          {"Loading"}
        </button>
      ) : (
        <button
          type="submit"
          className="bg-orange-500 rounded-md py-3 text-xl text-white"
        >
          {"Submit"}
        </button>
      )}
    </form>
  );
};

export default BookingForm;
