"use client";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import { Dialog, Transition } from "@headlessui/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { RotatingLines } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaUser, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import districtData from "../../../../../utils/districts.json";

const Address = ({
  selectAddress,
  setSelectAddress,
  design,
  setToken,
  token,
  setUserAddress,
  userPhone,
  setUserPhone,
  setUserName,
  setShipping_area,
  setUserNote,
}: any) => {
  const [address, setAddress] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [call, setCall] = useState(null);
  const { store_id, store, headerSetting } = useTheme();
  const [loading, setLoading] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const { user } = useSelector((state: any) => state.auth);

  const handleChange = (e: any) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, "");
    // Check if the numeric value length is exactly 11 characters
    setUserPhone(numericValue);
    setIsPhoneValid(numericValue.length === 11);
  };

  const handleBlur = () => {
    // Check if the length of userPhone is exactly 11 characters
    setIsPhoneValid(userPhone?.length === 11);
  };

  // Update the shipping area based on the selected district
  useEffect(() => {
    if (!selectedDistrict) {
      setShipping_area(0);
    } else if (selectedDistrict === "Dhaka") {
      setShipping_area(parseInt(headerSetting?.shipping_area_1_cost));
    } else {
      setShipping_area(parseInt(headerSetting?.shipping_area_2_cost));
    }
  }, [selectedDistrict, headerSetting, setShipping_area]);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL + "address";

  useEffect(() => {
    console.log(store);
    if (store?.auth_type === "EasyOrder" && !user) {
      const postToServer = async () => {
        const store = {
          store_id: store_id,
        };

        try {
          const response = await axios.post(apiUrl, store, {
            headers: {
              Authorization: `Bearer ${token?.token}`,
              "Content-Type": "application/json", // Adjust the content type according to your API requirements
            },
          });
          setAddress(response?.data?.address);
          setSelectAddress(response?.data?.address[0]);
          setLoading(false);
        } catch (error) {
          // console.error('Error posting data:', error);
          // Handle any errors here
        }
      };

      // Call the function whenever you want to post data with the token
      postToServer();
    } else {
      // setLoading(true)
      httpReq
        .post("address", { store_id })
        .then(({ address }) => {
          setAddress(address);
          setSelectAddress(address[0]);
          setLoading(false);
        })
        .catch((err) => console.log(err, "error"));
    }
  }, [store_id, call, setSelectAddress, token, store?.auth_type, user]);

  return (
    <>
      <div className={"bg-white shadow sm:rounded-md sm:overflow-hidden mb-5"}>
        <div className="px-4 py-5 space-y-6 sm:p-6">
          <div className="">
            <div className="flex justify-end items-center pb-3">
              {user && (
                <span
                  className="text-green-600 font-semibold tracking-wider lg:cursor-pointer"
                  onClick={() => setOpen(true)}
                >
                  {" "}
                  + Add
                </span>
              )}
            </div>
            {store?.auth_type === "EasyOrder" && !user ? (
              <div className="flex flex-col gap-3">
                {/* Name Input */}
                <div className="flex flex-col">
                  <label className="font-semibold">
                    আপনার নাম লিখুন <span className="text-red-500">*</span>
                  </label>
                  <input
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                    placeholder="সম্পূর্ণ নামটি লিখুন"
                    required
                    className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-gray-400"
                  />
                </div>

                {/* Phone Input */}
                <div className="flex flex-col">
                  <label className="font-semibold">
                    আপনার মোবাইল নাম্বার লিখুন{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={userPhone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="number"
                    placeholder="১১ ডিজিটের মোবাইল নাম্বারটি লিখুন"
                    required
                    className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-gray-400"
                    maxLength={11}
                    minLength={11}
                  />
                  {/* Phone Validation Error */}
                  {!isPhoneValid && (
                    <small className="text-rose-500">Need 11 digits</small>
                  )}
                </div>

                {/* District Dropdown */}
                <div className="flex flex-col">
                  <label className="font-semibold">
                    জেলা সিলেক্ট করুন <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    required
                    className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-gray-400"
                  >
                    <option value="" disabled>
                      জেলা সিলেক্ট করুন
                    </option>
                    {districtData.districts.map((district) => (
                      <option key={district.id} value={district.name}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Address Input */}
                <div className="flex flex-col">
                  <label className="font-semibold">
                    সম্পূর্ণ ঠিকানা <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    onChange={(e) => setUserAddress(e.target.value)}
                    placeholder="হাউজ নাম্বার, রোড, ইউনিয়ন, উপজেলা, জেলা"
                    required
                    className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-gray-400"
                  ></textarea>
                </div>

                {/* Note (Optional) */}
                <div className="flex flex-col">
                  <label className="font-semibold">নোট (অপশনাল)</label>
                  <textarea
                    onChange={(e) => setUserNote(e.target.value)}
                    placeholder="আপনার স্পেশাল কোন রিকোয়ারমেন্ট থাকলে এখানে লিখুন"
                    className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-gray-400"
                  ></textarea>
                </div>
              </div>
            ) : !address || address.length === 0 ? (
              <div>
                <AddressView
                  design={design}
                  store={store}
                  setSelectAddress={setSelectAddress}
                  setCall={setCall}
                  address={address}
                  store_id={store_id}
                  setToken={setToken}
                  setShipping_area={setShipping_area}
                />
              </div>
            ) : (
              <div className="grid xl:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 grid-cols-1 gap-4">
                {address
                  ?.slice(0, 4)
                  .map((item: any) => (
                    <Single
                      token={token}
                      item={item}
                      key={item?.id}
                      selectAddress={selectAddress}
                      setSelectAddress={setSelectAddress}
                      setCall={setCall}
                      setShipping_area={setShipping_area}
                    />
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <SaveAddress
        token={token}
        store={store}
        store_id={store_id}
        setToken={setToken}
        open={open}
        setOpen={setOpen}
        setCall={setCall}
        design={design}
        setShipping_area={setShipping_area}
      />
    </>
  );
};

export default Address;

const Single = ({
  item,
  selectAddress,
  setSelectAddress,
  setCall,
  token,
  setShipping_area,
}: any) => {
  const [open, setOpen] = useState(false);
  const { design, store } = useTheme();

  const { user } = useSelector((state: any) => state.auth);

  const apiDelete = process.env.NEXT_PUBLIC_API_URL + "address/delete";

  const delete_address = (id: any) => {
    if (store?.auth_type === "EasyOrder" && !user) {
      const address_id = {
        id: id,
      };
      const DeleteAddress = async () => {
        try {
          const response = await axios.post(apiDelete, address_id, {
            headers: {
              Authorization: `Bearer ${token?.token}`,
              "Content-Type": "application/json", // Adjust the content type according to your API requirements
            },
          });
          toast(response.data.success, { type: "success" });
          setCall(Math.random() * 100);
        } catch (error) {
          console.error("Error posting data:", error);
          // Handle any errors here
        }
      };

      // Call the function whenever you want to post data with the token
      DeleteAddress();
    } else {
      httpReq
        .post("address/delete", { id })
        .then(({ success }) => {
          toast(success, { type: "success" });
          setCall(Math.random() * 100);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <label
      style={{
        backgroundColor:
          selectAddress?.id === item?.id
            ? design?.header_color
            : design?.template_id === "34"
              ? "#000"
              : "#fff",
        color:
          selectAddress?.id === item?.id
            ? design?.text_color
            : design?.template_id === "34"
              ? "#fff"
              : "#000",
      }}
      className={`border border-gray-300 p-5 rounded space-y-2 w-full transition-colors duration-300 relative`}
    >
      <div className="flex justify-between lg:cursor-pointer">
        <h3 className="font-semibold tracking-wide capitalize">
          Name: {item?.name}
        </h3>
        <div className="flex flex-col">
          <TrashIcon width={20} onClick={() => delete_address(item?.id)} />
          <PencilIcon width={20} onClick={() => setOpen(true)} />
          <UpdateAddress
            token={token}
            open={open}
            setOpen={setOpen}
            item={item}
            setCall={setCall}
            setSelectAddress={setSelectAddress}
            design={design}
            setShipping_area={setShipping_area}
          />
        </div>
      </div>
      <p className="font-normal text-sm tracking-wider">
        <span className="text-base font-medium">Phone:</span> {item?.phone}
      </p>
      <p className="font-normal text-sm tracking-wider">
        <span className="text-base font-medium">Address: </span>
        {item?.address}
      </p>
      <input
        className="absolute bottom-5 right-5"
        name="address-type"
        type="radio"
        onChange={() => setSelectAddress(item)}
      />
    </label>
  );
};

const AddressView = ({
  setCall,
  store_id,
  setToken,
  store,
  design,
  setShipping_area,
}: any) => {
  const { user } = useSelector((state: any) => state.auth);
  const { headerSetting } = useTheme();
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Update the shipping area based on the selected district
  useEffect(() => {
    if (!selectedDistrict) {
      setShipping_area(0);
    } else if (selectedDistrict === "Dhaka") {
      setShipping_area(parseInt(headerSetting?.shipping_area_1_cost));
    } else {
      setShipping_area(parseInt(headerSetting?.shipping_area_2_cost));
    }
  }, [selectedDistrict, headerSetting, setShipping_area]);

  const onSubmit = async (data: any) => {
    try {
      data["store_id"] = store_id;
      if (store?.auth_type == "EasyOrder" && !user) {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_API_URL + "address/easy-order/save",
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
          .catch((err) => {
            // console.log("Error during HTTP request:", err);
            toast("Error saving address", { type: "error" });
          });
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
      toast("Error saving address", { type: "error" });
    }
  };

  return (
    <div>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="shadow overflow-hidden sm:rounded-md w-full">
          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                নাম
              </label>
              <div className="flex items-center mt-1 border focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                <div className="bg-gray-200 p-2 rounded-l-md rounded-r-none">
                  <FaUser className="text-black" />
                </div>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="address-level1"
                  className="flex-grow ml-2 outline-none"
                />
              </div>
              {errors.name && (
                <span className="text-red-500">Name is required</span>
              )}
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                ফোন
              </label>
              <div className="flex items-center mt-1 border focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                <div className="bg-gray-200 p-2 rounded-l-md rounded-r-none">
                  <FaPhoneAlt className="text-black" />
                </div>
                <input
                  {...register("phone", {
                    required: true,
                    minLength: 11,
                    maxLength: 11,
                  })}
                  type="number"
                  name="phone"
                  id="phone"
                  autoComplete="address-level1"
                  className="flex-grow ml-2 outline-none"
                />
              </div>
              {errors.phone?.type === "required" && (
                <span className="text-red-500">Phone number is required</span>
              )}
              {errors.phone?.type === "minLength" && (
                <span className="text-red-500">
                  Please enter a valid phone number
                </span>
              )}
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <label
                htmlFor="district"
                className="block text-sm font-medium text-gray-700"
              >
                জেলা
              </label>
              <select
                {...register("district", { required: true })}
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                required
                id="district"
                name="district"
                className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-gray-400 block w-full"
              >
                <option value="" disabled>
                  জেলা নির্বাচন করুন
                </option>
                {districtData.districts.map((district) => (
                  <option key={district.id} value={district.name}>
                    {district.name}
                  </option>
                ))}
              </select>
              {errors.district && (
                <span className="text-red-500">District is required</span>
              )}
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                ঠিকানা
              </label>
              <div className="flex items-start mt-1 border focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                <div className="bg-gray-200 p-2 rounded-l-md rounded-r-none">
                  <FaMapMarkerAlt className="text-black" />
                </div>
                <textarea
                  {...register("address", { required: true })}
                  rows={6}
                  name="address"
                  id="address"
                  autoComplete="address-level1"
                  className="flex-grow ml-2 outline-none"
                />
              </div>
              {errors.address && (
                <span className="text-red-500">Address is required</span>
              )}
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
    </div>
  );
};

// Add address
export function SaveAddress({
  store,
  token,
  open,
  setOpen,
  setCall,
  setToken,
  store_id,
  design,
  setShipping_area,
}: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const { user } = useSelector((state: any) => state.auth);
  const { headerSetting } = useTheme();
  const [selectedDistrict, setSelectedDistrict] = useState("");

  // Update the shipping area based on the selected district
  useEffect(() => {
    if (!selectedDistrict) {
      setShipping_area(0);
    } else if (selectedDistrict === "Dhaka") {
      setShipping_area(parseInt(headerSetting?.shipping_area_1_cost));
    } else {
      setShipping_area(parseInt(headerSetting?.shipping_area_2_cost));
    }
  }, [selectedDistrict, headerSetting, setShipping_area]);

  const onSubmit = async (data: any) => {
    data["store_id"] = store_id;
    if (store?.auth_type === "EasyOrder" && !user && !token) {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "address/easy-order/save",
        data
      );
      reset();
      setToken(response?.data?.token);
      setCall(Math.random() * 100);
      toast(response?.data?.success, { type: "success" });
      setOpen(!open);
    } else if (store?.auth_type === "EasyOrder" && !user && token) {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "address/save",
        data,
        {
          headers: {
            Authorization: `Bearer ${token?.token}`,
            "Content-Type": "application/json", // Adjust the content type according to your API requirements
          },
        }
      );
      reset();
      setToken(response?.data?.token);
      setCall(Math.random() * 100);
      toast(response?.data?.success, { type: "success" });
      setOpen(!open);
    } else {
      httpReq
        .post("address/save", data)
        .then(({ success, token }) => {
          reset();
          setToken(token);
          setCall(Math.random() * 100);
          toast(success, { type: "success" });
          setOpen(!open);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <Modal open={open} setOpen={setOpen} design={design}>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="shadow overflow-hidden sm:rounded-md w-full">
            <div
              className={`px-4 py-5 ${
                design?.template_id === "34" ? "bg-thirty-one" : "bg-[#F3F4F6]"
              }  space-y-6 sm:p-6`}
            >
              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  নাম
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="address-level1"
                  className="mt-1 border p-2 text-black focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                {errors.name && (
                  <span className="text-red-500">Name is required</span>
                )}
              </div>
              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  ফোন
                </label>
                <input
                  {...register("phone", {
                    required: true,
                    minLength: 11,
                    maxLength: 11,
                  })}
                  type="number"
                  name="phone"
                  id="phone"
                  autoComplete="address-level1"
                  className="mt-1 border p-2 text-black focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />

                {errors.phone?.type === "required" && (
                  <span className="text-red-500">Phone number is required</span>
                )}
                {errors.phone?.type === "minLength" && (
                  <span className="text-red-500">
                    Please enter correct phone number
                  </span>
                )}
              </div>
              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label
                  htmlFor="district"
                  className="block text-sm font-medium text-gray-700"
                >
                  জেলা
                </label>
                <select
                  {...register("district", { required: true })}
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  required
                  id="district"
                  name="district"
                  className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-gray-400 block w-full"
                >
                  <option value="" disabled>
                    জেলা নির্বাচন করুন
                  </option>
                  {districtData.districts.map((district) => (
                    <option key={district.id} value={district.name}>
                      {district.name}
                    </option>
                  ))}
                </select>
                {errors.district && (
                  <span className="text-red-500">District is required</span>
                )}
              </div>
              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  ঠিকানা
                </label>
                <textarea
                  {...register("address", { required: true })}
                  rows={6}
                  name="address"
                  id="address"
                  autoComplete="address-level1"
                  className="mt-1 border p-2 text-black focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                {errors.address && (
                  <span className="text-red-500">Address is required</span>
                )}
              </div>
            </div>
            <div className="px-4 py-3 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}

// update address
export function UpdateAddress({
  open,
  setOpen,
  item,
  setCall,
  setSelectAddress,
  design,
  token,
  setShipping_area,
}: any) {
  const { store } = useTheme();

  const { user } = useSelector((state: any) => state.auth);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const apiEdit = process.env.NEXT_PUBLIC_API_URL + "address/edit";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      ...item,
    },
  });

  const { headerSetting } = useTheme();
  // Update the shipping area based on the selected district
  useEffect(() => {
    if (!selectedDistrict) {
      setShipping_area(0);
    } else if (selectedDistrict === "Dhaka") {
      setShipping_area(parseInt(headerSetting?.shipping_area_1_cost));
    } else {
      setShipping_area(parseInt(headerSetting?.shipping_area_2_cost));
    }
  }, [selectedDistrict, headerSetting, setShipping_area]);

  const onSubmit = (data: any) => {
    data["id"] = item?.id;

    if (store?.auth_type === "EasyOrder" && !user) {
      const editAddress = async () => {
        try {
          const response = await axios.post(apiEdit, data, {
            headers: {
              Authorization: `Bearer ${token?.token}`,
              "Content-Type": "application/json", // Adjust the content type according to your API requirements
            },
          });
          setCall(Math.random() * 100);
          toast(response?.data?.success, { type: "success" });
          setOpen(false);
          reset();
          setSelectAddress(null);
        } catch (error) {
          console.error("Error posting data:", error);
          // Handle any errors here
        }
      };

      // Call the function whenever you want to post data with the token
      editAddress();
    } else {
      httpReq
        .post("address/edit", data)
        .then(({ success }) => {
          setCall(Math.random() * 100);
          toast(success, { type: "success" });
          setOpen(false);
        })
        .catch((err) => console.log(err));
      reset();
      setSelectAddress(null);
    }
  };

  return (
    <Modal open={open} setOpen={setOpen} design={design}>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="shadow overflow-hidden sm:rounded-md w-full">
          <div
            className={`px-4 py-5 ${
              design?.template_id === "34"
                ? "bg-thirty-one border border-white"
                : "bg-white"
            }  space-y-6 sm:p-6`}
          >
            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                নাম
              </label>
              <input
                {...register("name")}
                type="text"
                name="name"
                id="name"
                autoComplete="address-level1"
                className="mt-1 border p-2  focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                ফোন
              </label>
              <input
                {...register("phone", {
                  required: true,
                  minLength: 11,
                  maxLength: 11,
                })}
                type="number"
                name="phone"
                id="phone"
                autoComplete="address-level1"
                className="mt-1 border p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              {errors.phone && (
                <span className="text-red-500">Phone number is required</span>
              )}
            </div>
            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <label
                htmlFor="district"
                className="block text-sm font-medium text-gray-700"
              >
                জেলা
              </label>
              <select
                {...register("district", { required: true })}
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                required
                id="district"
                name="district"
                className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-gray-400 block w-full"
              >
                <option value="" disabled>
                  জেলা নির্বাচন করুন
                </option>
                {districtData.districts.map((district) => (
                  <option key={district.id} value={district.name}>
                    {district.name}
                  </option>
                ))}
              </select>
              {errors.district && (
                <span className="text-red-500">District is required</span>
              )}
            </div>
            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                ঠিকানা
              </label>
              <textarea
                {...register("address")}
                rows={6}
                id="address"
                autoComplete="address-level1"
                className="mt-1 border p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
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
    </Modal>
  );
}

// modal for address update
export function Modal({ open, setOpen, children, design }: any) {
  // console.log(open, "open fron dia");
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`relative ${
                  design?.template_id === "34"
                    ? "bg-thirty-one border border-white"
                    : "bg-white"
                }  rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full`}
              >
                <div
                  className={`${
                    design?.template_id === "34"
                      ? "bg-thirty-one border border-white"
                      : "bg-white"
                  }  px-4 pt-5 pb-4 sm:p-6 sm:pb-4`}
                >
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
