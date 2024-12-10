"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Address = ({
  selectAddress,
  setSelectAddress,
  setToken,
  token,
  setUserAddress,
  setUserPhone,
  setUserName,
  userPhone,
  setUserEmail,
  setUserNote,
}: any) => {
  const [address, setAddress] = useState<any>(null);
  const [open, setOpen] = useState<any>(false);
  const [call, setCall] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);
  const [isPhoneValid, setIsPhoneValid] = useState<any>(true);
  const [formField, setFormField] = useState<any>(null);

  const { store_id, store } = useTheme();
  const { user } = useSelector((state: any) => state.auth);

  const handleChange = (e: any) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, "");
    // Check if the numeric value length is exactly 11 characters
    setUserPhone(numericValue);
    setIsPhoneValid(numericValue.length === 11);
  };

  const handleBlur: any = () => {
    // Check if the length of userPhone is exactly 11 characters
    setIsPhoneValid(userPhone.length === 11);
  };

  const apiUrl = process.env.NEXT_PUBLIC_API_URL + "address";

  useEffect(() => {
    const fetchCheckoutFormFields = async () => {
      try {
        const apiFormField =
          process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_V2 +
          `/checkout-page/form-field/${store_id}`;

        const response = await axios.get(apiFormField);
        setFormField(response?.data);
      } catch (error: any) {
        // console.error(
        //   "Error fetching checkout form fields:",
        //   error.response?.data || error.message
        // );
      }
    };
    if (store_id) {
      fetchCheckoutFormFields();
    }
  }, [store_id]);

  useEffect(() => {
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
        .then(({ address }: any) => {
          setAddress(address);
          setSelectAddress(address[0]);
          setLoading(false);
        })
        .catch((err: any) => console.log(err, "error"));
    }
  }, [store_id, call, setSelectAddress, token, store?.auth_type, user]);

  return (
    <>
      <div className="shadow sm:rounded-md sm:overflow-hidden my-5">
        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div className="col-span-6 sm:col-span-4">
            <div className="flex justify-between items-center pb-3">
              <label
                htmlFor="name"
                className="block text-xl font-semibold text-gray-700"
              >
                Addresses{" "}
                <span className="text-sm">( Please Select Your Address )</span>
              </label>
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
                {formField?.data?.map((field: any) => {
                  if (field.status === 1) {
                    if (field.name === "name") {
                      return (
                        <input
                          key={field.id}
                          onChange={(e) => setUserName(e.target.value)}
                          type="text"
                          placeholder="Name"
                          className="w-full border border-gray-400 p-2 focus:outline-none focus:border focus:border-gray-400 rounded focus:ring-0"
                        />
                      );
                    }

                    if (field.name === "email") {
                      return (
                        <input
                          key={field.id}
                          onChange={(e) => setUserEmail(e.target.value)}
                          type="email"
                          placeholder="Email"
                          className="w-full border border-gray-400 p-2 focus:outline-none focus:border focus:border-gray-400 rounded focus:ring-0"
                        />
                      );
                    }

                    if (field.name === "phone") {
                      return (
                        <div key={field.id}>
                          <input
                            value={userPhone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="number"
                            placeholder="Phone"
                            className="w-full border border-gray-400 p-2 focus:outline-none focus:border focus:border-gray-400 rounded focus:ring-0"
                          />
                          {!isPhoneValid && (
                            <small className="text-rose-500">
                              Need 11 digits
                            </small>
                          )}
                        </div>
                      );
                    }

                    if (field.name === "address") {
                      return (
                        <textarea
                          key={field.id}
                          onChange={(e) => setUserAddress(e.target.value)}
                          placeholder="Address"
                          className="w-full border p-2 border-gray-400 focus:outline-none focus:border focus:border-gray-400 rounded focus:ring-0"
                        />
                      );
                    }

                    if (field.name === "note") {
                      return (
                        <textarea
                          key={field.id}
                          onChange={(e) => setUserNote(e.target.value)}
                          placeholder="Note"
                          className="w-full border p-2 border-gray-400 focus:outline-none focus:border focus:border-gray-400 rounded focus:ring-0"
                        />
                      );
                    }
                  }

                  return null;
                })}
              </div>
            ) : (
              <div>
                {(!address || address.length === 0) && (
                  <div>
                    <AddressView
                      store={store}
                      setSelectAddress={setSelectAddress}
                      setCall={setCall}
                      address={address}
                      store_id={store_id}
                      setToken={setToken}
                      formField={formField}
                    />
                  </div>
                )}
                {loading ? (
                  <div className="flex items-center">
                    {" "}
                    <RotatingLines
                      width="25"
                      strokeColor="#6495ED"
                      strokeWidth="6"
                    />
                    <p>Loading...</p>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
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
                          formField={formField}
                        />
                      ))}
                  </div>
                )}
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
        formField={formField}
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
  formField,
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
          selectAddress?.id === item?.id ? design?.header_color : "#fff",
        color: selectAddress?.id === item?.id ? design?.text_color : "#000",
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
            formField={formField}
          />
        </div>
      </div>
      <p className="font-normal text-sm tracking-wider">
        <span className="text-base font-medium">Email:</span> {item?.email}
      </p>
      <p className="font-normal text-sm tracking-wider">
        <span className="text-base font-medium">Phone:</span> {item?.phone}
      </p>
      <p className="font-normal text-sm tracking-wider">
        <span className="text-base font-medium">Address: </span>
        {item?.address}
      </p>
      <p className="font-normal text-sm tracking-wider">
        <span className="text-base font-medium">Note:</span> {item?.note}
      </p>
      <input
        className="hidden"
        name="address-type"
        type="radio"
        onChange={() => setSelectAddress(item)}
      />
    </label>
  );
};

const AddressView = ({
  store,
  setCall,
  store_id,
  setToken,
  formField,
}: any) => {
  const { user } = useSelector((state: any) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    data["store_id"] = store_id;

    if (store?.auth_type === "EasyOrder" && !user) {
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
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="shadow overflow-hidden sm:rounded-md w-full">
          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
            {formField?.data?.map((field: any) => {
              if (field.status === 1) {
                if (field.name === "name") {
                  return (
                    <div
                      key={field.id}
                      className="col-span-6 sm:col-span-3 lg:col-span-2"
                    >
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        {...register("name", { required: true })}
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="address-level1"
                        className="mt-1 border p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      {errors.name && (
                        <span className="text-red-500">Name is required</span>
                      )}
                    </div>
                  );
                }

                if (field.name === "email") {
                  return (
                    <div
                      key={field.id}
                      className="col-span-6 sm:col-span-3 lg:col-span-2"
                    >
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        {...register("email", { required: true })}
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        className="mt-1 border p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      {errors.email && (
                        <span className="text-red-500">Email is required</span>
                      )}
                    </div>
                  );
                }

                if (field.name === "phone") {
                  return (
                    <div
                      key={field.id}
                      className="col-span-6 sm:col-span-3 lg:col-span-2"
                    >
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone
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
                      {errors.phone?.type === "required" && (
                        <span className="text-red-500">
                          Phone number is required
                        </span>
                      )}
                      {errors.phone?.type === "minLength" && (
                        <span className="text-red-500">
                          Please enter a correct phone number
                        </span>
                      )}
                    </div>
                  );
                }

                if (field.name === "address") {
                  return (
                    <div
                      key={field.id}
                      className="col-span-6 sm:col-span-3 lg:col-span-2"
                    >
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
                        className="mt-1 border p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  );
                }

                if (field.name === "note") {
                  return (
                    <div
                      key={field.id}
                      className="col-span-6 sm:col-span-3 lg:col-span-2"
                    >
                      <label
                        htmlFor="note"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Note
                      </label>
                      <textarea
                        {...register("note")}
                        rows={3}
                        name="note"
                        id="note"
                        autoComplete="address-level1"
                        className="mt-1 border p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  );
                }
              }

              return null;
            })}
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
  formField,
}: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { user } = useSelector((state: any) => state.auth);

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
      <Modal open={open} setOpen={setOpen}>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="shadow overflow-hidden sm:rounded-md w-full">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              {formField?.data?.map((field: any) => {
                if (field.status === 1) {
                  if (field.name === "name") {
                    return (
                      <div
                        key={field.id}
                        className="col-span-6 sm:col-span-3 lg:col-span-2"
                      >
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          {...register("name", { required: true })}
                          type="text"
                          name="name"
                          id="name"
                          autoComplete="address-level1"
                          className="mt-1 py-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                        {errors.name && (
                          <span className="text-red-500">Name is required</span>
                        )}
                      </div>
                    );
                  }

                  if (field.name === "email") {
                    return (
                      <div
                        key={field.id}
                        className="col-span-6 sm:col-span-3 lg:col-span-2"
                      >
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          {...register("email", { required: true })}
                          type="email"
                          name="email"
                          id="email"
                          autoComplete="email"
                          className="mt-1 py-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                        {errors.email && (
                          <span className="text-red-500">
                            Email is required
                          </span>
                        )}
                      </div>
                    );
                  }

                  if (field.name === "phone") {
                    return (
                      <div
                        key={field.id}
                        className="col-span-6 sm:col-span-3 lg:col-span-2"
                      >
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phone
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
                          className="mt-1 py-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                        {errors.phone?.type === "required" && (
                          <span className="text-red-500">
                            Phone number is required
                          </span>
                        )}
                        {errors.phone?.type === "minLength" && (
                          <span className="text-red-500">
                            Please enter a valid phone number
                          </span>
                        )}
                      </div>
                    );
                  }

                  if (field.name === "address") {
                    return (
                      <div
                        key={field.id}
                        className="col-span-6 sm:col-span-3 lg:col-span-2"
                      >
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Address
                        </label>
                        <textarea
                          {...register("address", { required: true })}
                          rows={6}
                          name="address"
                          id="address"
                          autoComplete="address-level1"
                          className="mt-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                        {errors.address && (
                          <span className="text-red-500">
                            Address is required
                          </span>
                        )}
                      </div>
                    );
                  }

                  if (field.name === "note") {
                    return (
                      <div
                        key={field.id}
                        className="col-span-6 sm:col-span-3 lg:col-span-2"
                      >
                        <label
                          htmlFor="note"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Note
                        </label>
                        <textarea
                          {...register("note")}
                          rows={4}
                          name="note"
                          id="note"
                          autoComplete="note"
                          className="mt-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    );
                  }
                }
                return null;
              })}
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
  token,
  formField,
}: any) {
  const { store } = useTheme();

  const { user } = useSelector((state: any) => state.auth);

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
    <Modal open={open} setOpen={setOpen}>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="shadow overflow-hidden sm:rounded-md w-full">
          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
            {formField?.data?.map((field: any) => {
              if (field.status === 1) {
                if (field.name === "name") {
                  return (
                    <div
                      key={field.id}
                      className="col-span-6 sm:col-span-3 lg:col-span-2"
                    >
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
                        className="mt-1 border p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  );
                }
                if (field.name === "email") {
                  return (
                    <div
                      key={field.id}
                      className="col-span-6 sm:col-span-3 lg:col-span-2"
                    >
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        className="mt-1 border p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  );
                }
                if (field.name === "phone") {
                  return (
                    <div
                      key={field.id}
                      className="col-span-6 sm:col-span-3 lg:col-span-2"
                    >
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone
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
                      {errors.phone?.type === "required" && (
                        <span className="text-red-500">
                          Phone number is required
                        </span>
                      )}
                      {errors.phone?.type === "minLength" && (
                        <span className="text-red-500">
                          Please enter a valid phone number
                        </span>
                      )}
                    </div>
                  );
                }
                if (field.name === "address") {
                  return (
                    <div
                      key={field.id}
                      className="col-span-6 sm:col-span-3 lg:col-span-2"
                    >
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
                        className="mt-1 border p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  );
                }
                if (field.name === "note") {
                  return (
                    <div
                      key={field.id}
                      className="col-span-6 sm:col-span-3 lg:col-span-2"
                    >
                      <label
                        htmlFor="note"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Note
                      </label>
                      <textarea
                        {...register("note")}
                        rows={3}
                        name="note"
                        id="note"
                        autoComplete="address-level1"
                        className="mt-1 border p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  );
                }
              }
              return null;
            })}
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
export function Modal({ open, setOpen, children }: any) {
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
              <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
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
