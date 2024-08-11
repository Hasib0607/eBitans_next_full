"use client";
import CheckoutFrom from "@/components/_checkout-page/_components/checkout-from";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import { Dialog, Transition } from "@headlessui/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CheckOutSevenAddress = ({
  selectAddress,
  setSelectAddress,
  setToken,
  token,
  setUserAddress,
  setUserPhone,
  setUserName,
  userPhoneError,
  setUserPhoneError,
}: any) => {
  const { store_id, store } = useTheme();
  const [address, setAddress] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [call, setCall] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state: any) => state.auth);

  const apiUrl = "https://admin.ebitans.com/api/v1/address";

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
        .then(({ address }) => {
          setAddress(address);
          setSelectAddress(address[0]);
          // console.log(address, 'address');
          setLoading(false);
        })
        .catch((err) => console.log(err, "error"));
    }
  }, [store_id, call, setSelectAddress, token, store?.auth_type, user]);

  const phoneRegExp = /^(01\d{9}|8801\d{9}|\+8801\d{9})$/;

  // Function to handle input change and validation
  const handleChange = (e: any) => {
    const value = e.target.value;
    setUserPhone(value);

    // Validate the phone number
    if (phoneRegExp.test(value)) {
      setUserPhoneError(""); // Clear error if valid
    } else {
      setUserPhoneError("Invalid phone number"); // Set error message if invalid
    }
  };

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
                {!selectAddress && (
                  <span className="text-sm text-red-500">
                    ( Please Select Your Address ) *
                  </span>
                )}
              </label>
              {user && (
                <span
                  className="text-green-600 font-semibold tracking-wider lg:cursor-pointer"
                  onClick={() => setOpen(true)}
                >
                  {" "}
                  + Add Addresss
                </span>
              )}
            </div>
            {store?.auth_type === "EasyOrder" && !user ? (
              <div className="flex flex-col gap-3">
                <input
                  onChange={(e) => setUserName(e.target.value)}
                  type="text"
                  placeholder="Name"
                  className="border p-2 border-gray-400 focus:outline-none focus:border-blue-500 required rounded-lg focus:ring-0 p-2 text-lg "
                />

                <input
                  onChange={handleChange}
                  type="number"
                  placeholder="Phone"
                  className="p-2 border border-gray-400 focus:outline-none focus:border p-2  required: focus:border-gray-400 rounded focus:ring-0"
                />
                {/* for easy order if user provide a wrong number or wrong credential then show error  */}
                <p className="text-sm text-rose-500">{userPhoneError}</p>
                <textarea
                  rows={6}
                  onChange={(e) => setUserAddress(e.target.value)}
                  placeholder="Address....."
                  className="border p-2 border-gray-400 p-1 focus:outline-none focus:border required focus:border-gray-400 rounded focus:ring-0"
                />
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
                    />
                  </div>
                )}
                {loading ? (
                  <div>Loading</div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {address?.slice(0, 4).map((item: any) => (
                      <Single
                        token={token}
                        item={item}
                        key={item?.id}
                        selectAddress={selectAddress}
                        setSelectAddress={setSelectAddress}
                        setCall={setCall}
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
      />
    </>
  );
};

export default CheckOutSevenAddress;

const AddressView = ({ store, setCall, store_id, setToken }: any) => {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div>
      <CheckoutFrom
        store={store}
        setCall={setCall}
        store_id={store_id}
        setToken={setToken}
        user={user}
      />
    </div>
  );
};

const Single = ({
  item,
  selectAddress,
  setSelectAddress,
  setCall,
  token,
}: any) => {
  const [open, setOpen] = useState(false);

  const { design, store } = useTheme();

  const { user } = useSelector((state: any) => state.auth);

  const apiDelete = "https://admin.ebitans.com/api/v1/address/delete";

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

          // console.log('Post successful:', response.data);
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
        className="hidden"
        name="address-type"
        type="radio"
        onChange={() => setSelectAddress(item)}
      />
    </label>
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
        "https://admin.ebitans.com/api/v1/address/easy-order/save",
        data
      );
      reset();
      setToken(response?.data?.token);
      setCall(Math.random() * 100);
      toast(response?.data?.success, { type: "success" });
      setOpen(!open);
    } else if (store?.auth_type === "EasyOrder" && !user && token) {
      const response = await axios.post(
        "https://admin.ebitans.com/api/v1/address/save",
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
              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
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
                  className="mt-1 border p-2 focus:ring-green-500 focus:border-green-500 block p-2 w-full  sm:text-sm border-balck border rounded-md"
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
                  Phone
                </label>
                <input
                  {...register("phone", {
                    required: true.valueOf(),
                    minLength: 11,
                  })}
                  type="number"
                  name="phone"
                  id="phone"
                  autoComplete="address-level1"
                  className="mt-1 border p-2 focus:ring-indigo-500 focus:border-indigo-500 block  w-full  sm:text-sm border-black border rounded-md"
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
                  className="mt-1 border p-2 focus:ring-indigo-500 focus:border-indigo-500 p-2 block w-full  sm:text-sm border-black border rounded-md"
                />
                {errors.address && (
                  <span className="text-red-500">Address is required</span>
                )}
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent  text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
}: any) {
  const { store } = useTheme();

  const { user } = useSelector((state: any) => state.auth);

  const apiEdit = "https://admin.ebitans.com/api/v1/address/edit";

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
                className="mt-1 border p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full  sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                {...register("phone", {
                  required: true.valueOf(),
                  minLength: 11,
                })}
                type="number"
                name="phone"
                id="phone"
                autoComplete="address-level1"
                className="mt-1 border p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full  sm:text-sm border-gray-300 rounded-md"
              />
              {errors.phone && (
                <span className="text-red-500">Phone number is required</span>
              )}
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
                className="mt-1 p-2 border focus:ring-indigo-500 focus:border-indigo-500 block w-full  sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent  text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
