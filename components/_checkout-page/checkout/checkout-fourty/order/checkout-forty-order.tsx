"use client";
import MyModal from "@/components/modal";
import useTheme from "@/hooks/use-theme";
import { login } from "@/redux/features/auth.slice";
import {
  clearCartList,
  removeToCartList,
} from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import { btnhover } from "@/site-settings/style";
import httpReq from "@/utils/http/axios/http.service";
import Taka from "@/utils/taka";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getPrice } from "@/utils/get-price";
import "./checkout-five-order.css";
import getReferral from "@/utils/getReferral";

const CheckOutFortyOrder = ({
  couponDis,
  selectAddress,
  selectPayment,
  shipping_area,
  coupon,
  couponResult,
  setLoadPay,
  token,
  userName,
  userPhone,
  userAddress,
  formBookData,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [tax, setTax] = useState<any>(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [description, setDescription] = useState(null);
  let [isOpen, setIsOpen] = useState(false);
  let [files, setFiles] = useState([]);
  let [index, setIndex] = useState(null);

  const {
    headerSetting,
    store_id,
    design,
    store,
    setOrderPlaced,
    bookingData,
  } = useTheme();

  const { user } = useSelector((state: any) => state.auth);

  const cartList = useSelector((state: any) => state.cart.cartList);
  const router = useRouter();
  const dispatch = useDispatch();
  const priceList = cartList?.map((p: any) => p.qty * p?.price);
  const total = priceList.reduce(
    (previousValue: any, currentValue: any) => previousValue + currentValue,
    0
  );

  if (
    total < couponResult?.min_purchase ||
    (couponResult?.max_purchase && total > couponResult?.max_purchase) ||
    !couponDis
  ) {
    couponDis = 0;
  }

  const onFileChange = (e: any) => {
    setSelectedFiles(e.target.files);
  };

  function closeModal() {
    setIsOpen(false);
  }
  const handleFile = () => {
    setFiles((prevFiles: any) => {
      // If cartId exists, replace the old entry with the new one
      const updatedFiles = prevFiles.map((item: any) => {
        if (item?.cartId === index) {
          return {
            cartId: index,
            files: selectedFiles,
            description: description,
          };
        }
        return item;
      });

      // If cartId didn't exist in the previous array, add the new entry
      if (!updatedFiles.some((item: any) => item?.cartId === index)) {
        updatedFiles.push({
          cartId: index,
          files: selectedFiles,
          description: description,
        });
      }

      return updatedFiles;
    });
  };

  const updatedCartList = cartList.map((cart: any, index: any) => {
    if (files[index]) {
      return {
        ...cart,
        items: [files[index]], // Adding the new property 'items' with the product object from data
      };
    }
    return cart; // Return the cart as is if there's no corresponding product in data
  });

  // booking validation
  const bookingName = bookingData?.data?.find(
    (item: any) =>
      item?.field_name === "name" && item?.requirement_status === "required"
  );
  const bookingPhone = bookingData?.data?.find(
    (item: any) =>
      item?.field_name === "phone" && item?.requirement_status === "required"
  );
  const bookingEmail = bookingData?.data?.find(
    (item: any) =>
      item?.field_name === "email" && item?.requirement_status === "required"
  );
  const bookingDate = bookingData?.data?.find(
    (item: any) =>
      item?.field_name === "date" && item?.requirement_status === "required"
  );
  const bookingDateRange = bookingData?.data?.find(
    (item: any) =>
      item?.field_name === "date range" &&
      item?.requirement_status === "required"
  );
  const bookingLocationRange = bookingData?.data?.find(
    (item: any) =>
      item?.field_name === "location range" &&
      item?.requirement_status === "required"
  );
  const bookingTime = bookingData?.data?.find(
    (item: any) =>
      item?.field_name === "time" && item?.requirement_status === "required"
  );
  const bookingComment = bookingData?.data?.find(
    (item: any) =>
      item?.field_name === "comment" && item?.requirement_status === "required"
  );

  const bookingRequire =
    (bookingName && !formBookData?.name) ||
    (bookingPhone && !formBookData?.phone) ||
    (bookingEmail && !formBookData?.email) ||
    (bookingDate && !formBookData?.specificDate) ||
    (bookingDateRange &&
      (!formBookData?.startDate || !formBookData?.endDate)) ||
    (bookingLocationRange &&
      (!formBookData?.pickupLocation || !formBookData?.dropLocation)) ||
    (bookingTime && !formBookData?.time) ||
    (bookingComment && !formBookData?.comment);

  useEffect(() => {
    if (headerSetting?.tax) {
      const tax = ((headerSetting?.tax) / 100) * total;
      setTax(tax);
    }
  }, [headerSetting?.tax, total]);

  const apiOrder = process.env.NEXT_PUBLIC_API_URL + "placeorder";

  const handleCheckout = async () => {
    setLoading(true);
    // Retrieve the referral code from localStorage
    const referralCode = localStorage.getItem("referralCode");
    const cart = updatedCartList.map((item: any) => ({
      id: item.id,
      quantity: item.qty,
      discount:
        item.regular_price -
        getPrice(item.regular_price, item.discount_price, item.discount_type)!,
      price: item?.price - item.additional_price,
      size: item.size,
      color: item.color,
      additional_price: item.additional_price,
      unit: item.unit,
      volume: item.volume,
      items: item?.items,
      referral_code: getReferral(item.id),
    }));

    const formData = new FormData();

    for (let i = 0; i < cart.length; i++) {
      if (cart[i]?.items) {
        for (let j = 0; j < cart[i].items.length; j++) {
          if (cart[i]?.items[i]?.description) {
            formData.append(
              `product[${i}][items][${i}][description]`,
              cart[i]?.items[i]?.description
            );
          }
          if (cart[i].items[j]?.files?.length > 0) {
            for (let k = 0; k < cart[i].items[j].files.length; k++) {
              formData.append(
                `product[${i}][items][${j}][files][${k}]`,
                cart[i].items[j].files[k]
              );
            }
          }
        }
      }
    }

    for (let i = 0; i < cart.length; i++) {
      // Append all non-image properties of the cart item
      for (let key in cart[i]) {
        if (key !== "items") {
          formData.append(`product[${i}][${key}]`, cart[i][key]);
        }
      }
    }

    const data = {
      store_id: store_id,
      name: selectAddress?.name,
      phone: selectAddress?.phone,
      payment_type: selectPayment,
      address: selectAddress?.address,
      subtotal: total,
      shipping: parseInt(shipping_area),
      total:
        parseInt(total) + parseInt(tax) + parseInt(shipping_area) - couponDis,
      discount: couponDis,
      product: cart,
      tax: tax,
      coupon: coupon ? coupon : null,
      referral_code: referralCode || "",
    };
    formData.append("store_id", store_id);
    formData.append(
      "name",
      bookingData?.status === 200
        ? formBookData?.name
        : store?.auth_type === "EasyOrder" && !user
          ? userName
          : selectAddress?.name
    );
    formData.append(
      "phone",
      bookingData?.status === 200
        ? formBookData?.phone
        : store?.auth_type === "EasyOrder" && !user
          ? userPhone
          : selectAddress?.phone
    );
    formData.append("payment_type", selectPayment);
    formData.append(
      "address",
      bookingData?.status === 200
        ? ""
        : store?.auth_type === "EasyOrder" && !user
          ? userAddress
          : selectAddress?.address
    );
    formData.append("subtotal", total);
    formData.append("shipping", shipping_area);
    formData.append(
      "total",
      (
        parseInt(total) +
        parseInt(tax) +
        parseInt(shipping_area) -
        couponDis
      ).toString()
    );
    formData.append("discount", couponDis);
    formData.append("tax", tax);
    formData.append("coupon", coupon ? coupon : "");
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

    // Append referral code if available
    if (referralCode) {
      formData.append("referral_code", referralCode);
    }

    if (bookingRequire) {
      toast("Please Fill up Booking Information", {
        type: "warning",
        autoClose: 1000,
      });
    }
    if (!userAddress && !data.address && bookingData?.status !== 200) {
      toast("Please Select The Address", {
        type: "warning",
        autoClose: 1000,
      });
    }
    if (!userPhone && !user && bookingData?.status !== 200) {
      toast("Please write your phone number", {
        type: "warning",
        autoClose: 1000,
      });
    }
    if (!userName && !user && bookingData?.status !== 200) {
      toast("Please write your name", {
        type: "warning",
        autoClose: 1000,
      });
    }
    if (!data.payment_type) {
      toast("Please Select Payment Method", {
        type: "warning",
        autoClose: 1000,
      });
    }
    if (
      (!shipping_area || shipping_area === "--Select Area--") &&
      bookingData?.status !== 200
    ) {
      toast("Please Select Shipping Area", {
        type: "warning",
        autoClose: 1000,
      });
    }
    if (
      (bookingData?.status === 200 &&
        data.total &&
        data.payment_type &&
        data.product &&
        !bookingRequire) ||
      (data.total &&
        data.payment_type &&
        data.product &&
        shipping_area &&
        (data.address || (userAddress && userName && userPhone)))
    ) {
      setLoadPay(true);
      if (store?.auth_type === "EasyOrder" && !user) {
        const dataInfo = {
          name: bookingData?.status === 200 ? formBookData?.name : userName,
          phone: bookingData?.status === 200 ? formBookData?.phone : userPhone,
          address: userAddress,
          store_id: store_id,
        };
        const responseInfo = await axios.post(
          process.env.NEXT_PUBLIC_API_URL + "address/easy-order/save",
          dataInfo
        );
        const placeOrder = async () => {
          try {
            const response = await axios.post(apiOrder, formData, {
              headers: {
                Authorization: `Bearer ${responseInfo?.data?.token?.token}`,
                "Content-Type": "application/json", // Adjust the content type according to your API requirements
              },
            });

            if (response?.data?.url) {
              window.location.replace(response?.data.url);
              localStorage.removeItem("referralObj");
              dispatch(clearCartList());
            }

            if (response?.data) {
              if (!response?.data?.url && !response?.data?.error) {
                toast(
                  `Your #${response?.data?.order?.reference_no} order complete successfully!`,
                  {
                    type: "success",
                    autoClose: 1000,
                  }
                );
                dispatch(clearCartList());
                dispatch(
                  login({
                    tokenData: responseInfo?.data?.token,
                  }) as any
                )
                  .unwrap()
                  .then(({ verify, error }: any) => {
                    if (error) {
                      toast(error, { type: "error" });
                      router.push("/login");
                    }
                    if (verify) {
                      // toast(verify, { type: 'success' })
                      // window.location.replace("/profile");
                      setOrderPlaced(true);
                      router.push("/thank-you?total=" + data.total);
                      dispatch(clearCartList());
                    }
                  })
                  .catch((er: any) => {
                    toast("Credential Doesn't Match", {
                      type: "error",
                    });
                  });
                // navigate("/profile/order")
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
            if (response?.url) {
              window.location.replace(response.url);
              dispatch(clearCartList());
            }

            if (response) {
              if (!response?.url && !response?.error) {
                toast(
                  `Your #${response?.order?.reference_no} order complete successfully!`,
                  {
                    type: "success",
                    autoClose: 1000,
                  }
                );
                setOrderPlaced(true);
                router.push("/thank-you?total=" + data.total);
                dispatch(clearCartList());
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
            // error.response.data?.errors.map(i => alert.show(i.message, { type: 'error' }))
          });
      }
    } else {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   Purchase(parseInt(total + tax), "BDT");
  //   AddToCart();
  // }, [total, tax]);

  return (
    <div className="overflow-hidden bg-[#F4F4F4]">
      {/* {error && <SnackBar open={true} msg={error} />} */}

      <h3 className="text-sm px-2 w-full py-2">
        {bookingData?.status === 200 ? "Booking Details" : "SHOPPING BAG"}
      </h3>
      <hr />
      {cartList ? (
        <>
          <div className="">
            <div className=" flex flex-col justify-between pt-5">
              {/* Replace with your content */}
              <div className="px-2 ">
                {cartList?.map((item: any) => (
                  <div key={item.cartId} onClick={() => setIndex(index)}>
                    <Single
                      files={files}
                      index={index}
                      item={item}
                      setDescription={setDescription}
                      onFileChange={onFileChange}
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      setFiles={setFiles}
                      handleFile={handleFile}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="">
          <h3 className="text-center font-semibold text-lg text-black">
            No Products Found
          </h3>
        </div>
      )}
      <hr className="my-5" />
      <div className="my-5 text-gray-500 " style={{ fontWeight: 500 }}>
        <div className="flex justify-between items-center px-2">
          <p>Sub Total</p>
          <p>
            <Taka tk={parseInt(total)} />
          </p>
        </div>
        <div className="flex justify-between items-center px-2">
          <p>Discount</p>
          <p>{<Taka tk={couponDis} />}</p>
        </div>
        <div className="flex justify-between items-center px-2">
          <p>Tax</p>
          <p>{<Taka tk={parseInt(tax)} />}</p>
        </div>
        <div className="flex justify-between items-center px-2 pb-2">
          <p>Estimated Shipping</p>
          {shipping_area === "--Select Area--" ? (
            <p>
              <Taka /> 0
            </p>
          ) : (
            <p>
              <Taka tk={shipping_area} />
            </p>
          )}
        </div>
        <hr />
        <div className="flex justify-between items-center px-2 pt-2">
          <p>Total</p>
          {shipping_area === "--Select Area--" || shipping_area === null ? (
            <p>{<Taka tk={parseInt(total + tax) - couponDis} />}</p>
          ) : (
            <p>
              {
                <Taka
                  tk={
                    parseInt(total + tax) + parseInt(shipping_area) - couponDis
                  }
                />
              }
            </p>
          )}
        </div>
      </div>

      {loading ? (
        <button
          className={`font-semibold tracking-wider rounded-sm border border-gray-300 w-full py-3 ${btnhover}`}
          style={{
            backgroundColor: design?.header_color,
            color: design?.text_color,
          }}
        >
          Loading
        </button>
      ) : (
        <button
          // disabled={userPhone?.length !== 11}
          className={`font-semibold tracking-wider my-1 rounded-sm border border-gray-300 w-full py-3 ${btnhover}`}
          style={{
            backgroundColor: design?.header_color,
            color: design?.text_color,
          }}
          onClick={() => handleCheckout()}
        >
          {bookingData?.status === 200 ? "Book Now" : "Place Order"}
        </button>
      )}
      <MyModal
        files={files}
        index={index}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
        setDescription={setDescription}
        onFileChange={onFileChange}
        handleFile={handleFile}
      />
    </div>
  );
};

export default CheckOutFortyOrder;

const Single = ({ item, setIsOpen, files, index }: any) => {
  const { module } = useTheme();

  const uploadFile = module?.find((item: any) => item?.modulus_id === 104);

  function openModal() {
    setIsOpen(true);
  }

  const dispatch = useDispatch();

  const file = files.some((i: any) => i.cartId === index);

  return (
    <div
      key={item.id}
      className="flex justify-between space-x-1 last:border-0 border-b border-gray-400 py-2"
    >
      <div className="w-24">
        <img
          className="w-full h-auto "
          src={productImg + item.image[0]}
          alt=""
        />
      </div>
      <div className="flex flex-col gap-x-2 gap-y-1 pl-2 w-full">
        <h3 className="text-black text-md whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px] font-normal">
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            {item.name}
          </Link>
        </h3>
        <p className="text-sm">&#2547; {item?.price * item.qty} </p>
        <div className="flex flex-col gap-x-2 gap-y-1 justify-start">
          {/* <p className='text-sm'>&#2547; {parseInt(item?.price)} * {item?.qty} </p> */}
          <div className="flex items-center">
            {item?.color ? (
              <div className="flex items-center gap-2">
                <p className="text-sm">Color: </p>
                <p
                  style={{ backgroundColor: item?.color }}
                  className="w-2 h-2 rounded-full ring-1 ring-offset-2 ring-gray-600"
                ></p>
              </div>
            ) : null}
            {item?.size ? (
              <p className="text-sm">
                Size: <span className="font-normal text-sm">{item?.size}</span>
              </p>
            ) : null}
            {item?.unit ? (
              <p className="text-sm">
                Unit:{" "}
                <span className="font-normal text-sm">
                  {item?.volume + " " + item?.unit}
                </span>
              </p>
            ) : null}
          </div>
          <p className="text-sm">Quantity: {item.qty} </p>
        </div>
      </div>

      <div className="justify-self-end flex items-center gap-x-2">
        <MdDelete
          onClick={() => dispatch(removeToCartList(item.cartId))}
          className="text-2xl lg:cursor-pointer"
        />
        {uploadFile?.status === "1" && (
          <button
            onClick={() => openModal()}
            className="text-2xl lg:cursor-pointer"
          >
            {file ? <FaEdit /> : <AiOutlineUpload />}
          </button>
        )}
      </div>
    </div>
  );
};
