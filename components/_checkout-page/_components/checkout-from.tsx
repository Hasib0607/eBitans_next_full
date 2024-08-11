import httpReq from "@/utils/http/axios/http.service";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const phoneRegExp = /^(01\d{9}|8801\d{9}|\+8801\d{9})$/;

const schema = yup
  .object({
    name: yup
      .string()
      .trim() // Remove leading and trailing whitespace
      .min(1, "Name is required")
      .max(100, "Name must be at most 100 characters long")
      .required("Name is required"),

    phone: yup
      .string()
      .required("Phone number is required")
      .matches(phoneRegExp, "Phone number is not valid"), // Regex for Bangladesh phone numbers

    address: yup
      .string()
      .trim() // Remove leading and trailing whitespace
      .min(1, "Address is required")
      .max(255, "Address must be at most 255 characters long")
      .required("Address is required"),
  })
  .required();

const CheckoutFrom = ({ store, setCall, store_id, setToken, user }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: any) => {
    data["store_id"] = store_id;

    if (store?.auth_type === "EasyOrder" && !user) {
      const response = await axios.post(
        "https://admin.ebitans.com/api/v1/address/easy-order/save",
        data
      );
      reset();
      setToken(response?.data?.token);
      setCall(Math.random() * 100);
      toast(response?.data?.success, { type: "success" });
    } else {
      httpReq
        .post("address/save", data)
        .then(({ success, token }) => {
          reset();
          setToken(token);
          setCall(Math.random() * 100);
          toast(success, { type: "success" });
        })
        .catch((err) => console.log(err));
    }

    console.log(data, "data");
  };

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <div className="shadow overflow-hidden sm:rounded-md w-full">
        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              {...register("name")}
              type="text"
              name="name"
              id="name"
              autoComplete="address-level1"
              className="mt-1 focus:ring-0 focus:border-gray-400 block w-full shadow-md sm:text-md border-2 border-gray-300 rounded-lg p-3 text-gray-700"
            />
            <p className="text-rose-500">{errors.name?.message}</p>
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              {...register("phone")}
              type="number"
              name="phone"
              id="phone"
              autoComplete="address-level1"
              className="mt-1 focus:ring-0 focus:border-gray-400 block w-full shadow-md sm:text-md border-2 border-gray-300 rounded-lg p-3 text-gray-700"
            />
            <p className="text-rose-500">{errors.phone?.message}</p>
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <textarea
              {...register("address")}
              rows={6}
              name="address"
              id="address"
              autoComplete="address-level1"
              className="mt-1 focus:ring-0 focus:border-gray-400 block w-full shadow-md sm:text-md border-2 border-gray-300 rounded-lg p-3 text-gray-700"
            />
            <p className="text-rose-500">{errors.address?.message}</p>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default CheckoutFrom;
