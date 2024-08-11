"use client";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getPrice } from "@/utils/get-price";
import useTheme from "@/hooks/use-theme";
import {
  clearCartList,
  removeToCartList,
} from "@/redux/features/product.slice";
import { login } from "@/redux/features/auth.slice";
import httpReq from "@/utils/http/axios/http.service";
import { productImg } from "@/site-settings/siteUrl";
import Link from "next/link";
import BDT from "@/utils/bdt";
import MyModal from "@/components/modal";
import PaymentGateway from "../payment-gateway/payment-gateway";
import { btnhover } from "@/site-settings/style";

const YourOrders = ({
  couponDis,
  coupon,
  selectAddress,
  selectPayment,
  setSelectPayment,
  shipping_area,
  couponResult,
  setLoadPay,
  token,
  userName,
  userPhone,
  userAddress,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [tax, setTax] = useState<any>(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [description, setDescription] = useState(null);
  let [isOpen, setIsOpen] = useState(false);
  let [files, setFiles] = useState([]);
  let [index, setIndex] = useState(null);

  const { headerSetting, store_id, design, store, setOrderPlaced } = useTheme();

  const cartList = useSelector((state: any) => state.cart.cartList);
  const { user } = useSelector((state: any) => state.auth);

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

  useEffect(() => {
    if (headerSetting?.tax) {
      const tax = (parseInt(headerSetting?.tax) / 100) * total;
      setTax(tax);
    }
  }, [headerSetting?.tax, total]);

  const apiOrder = "https://admin.ebitans.com/api/v1/placeorder";

  const handleCheckout = async () => {
    setLoading(true);

    const cart = updatedCartList.map((item: any) => ({
      id: item.id,
      quantity: item.qty,
      // discount:
      //   item.regular_price -
      //   getPrice(item.regular_price, item.discount_price, item.discount_type),
      price: item?.price - item.additional_price,
      size: item.size,
      color: item.color,
      additional_price: item.additional_price,
      unit: item.unit,
      volume: item.volume,
      items: item?.items,
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
      total: total + tax + parseInt(shipping_area) - couponDis,
      discount: couponDis,
      product: cart,
      tax: tax,
      coupon: coupon ? coupon : null,
    };

    formData.append("store_id", store_id);
    formData.append(
      "name",
      store?.auth_type === "EasyOrder" && !user ? userName : selectAddress?.name
    );
    formData.append(
      "phone",
      store?.auth_type === "EasyOrder" && !user
        ? userPhone
        : selectAddress?.phone
    );
    formData.append("payment_type", selectPayment);
    formData.append(
      "address",
      store?.auth_type === "EasyOrder" && !user
        ? userAddress
        : selectAddress?.address
    );
    formData.append("subtotal", total);
    formData.append("shipping", shipping_area);
    // formData.append("total", total + tax + parseInt(shipping_area) - couponDis);
    formData.append("discount", couponDis);
    formData.append("tax", tax);
    formData.append("coupon", coupon ? coupon : "");

    // for (let key in data) {
    //     formData.append(key, data[key]);
    // }

    if (!userAddress && !data.address) {
      toast("Please Select The Address", {
        type: "warning",
        autoClose: 1000,
      });
    }
    if (!userPhone && !user) {
      toast("Please write your phone number", {
        type: "warning",
        autoClose: 1000,
      });
    }
    if (!userName && !user) {
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

    if (!shipping_area || shipping_area === "--Select Area--") {
      toast("Please Select Shipping Area", {
        type: "warning",
        autoClose: 1000,
      });
    }
    if (
      data.total &&
      data.payment_type &&
      data.product &&
      shipping_area &&
      (data.address || (userAddress && userName && userPhone))
    ) {
      setLoadPay(true);

      if (store?.auth_type === "EasyOrder" && !user) {
        const dataInfo = {
          name: userName,
          phone: userPhone,
          address: userAddress,
          store_id: store_id,
        };
        const responseInfo = await axios.post(
          "https://admin.ebitans.com/api/v1/address/easy-order/save",
          dataInfo
        );
        const placeOrder = async () => {
          try {
            const response = await axios.post(apiOrder, formData, {
              headers: {
                Authorization: `Bearer ${responseInfo?.data?.token?.token}`,
                "Content-Type": "application/json",
              },
            });
            // console.log('response:', response);

            if (response?.data?.url) {
              window.location.replace(response?.data.url);
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
                setOrderPlaced(true);
                dispatch(clearCartList());
                dispatch(login({ tokenData: responseInfo?.data?.token }) as any)
                  .unwrap()
                  .then(({ verify, error }: any) => {
                    if (verify) {
                      // toast(verify, { type: 'success' })
                      // window.location.replace("/profile");
                      setOrderPlaced(true);
                      router.push("/thank-you");
                      dispatch(clearCartList());
                    }
                    if (error) {
                      toast(error, { type: "error" });
                      router.push("/login");
                    }
                  })
                  .catch((er: any) => {
                    toast("Credential Doesn't Match", { type: "error" });
                  });
                router.push("/profile/order");
              }
              if (response?.data?.error) {
                toast(response?.data?.error, {
                  type: "error",
                  autoClose: 1000,
                });
                setLoading(false);
              }
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
            // console.log('response:', response);
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
                router.push("/thank-you");
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
            console.log(errors);
            console.log(message);
            // error.response.data?.errors.map(i => alert.show(i.message, { type: 'error' }))
          });
      }
    } else {
      setLoading(false);
    }
  };

  const styleCss = `

    .cart-btn {
        color: ${design?.text_color};
        background:  ${design?.header_color};
        border: 2px solid  ${design?.header_color};
    }
    .cart-btn:hover {
        color:  ${design?.header_color};
        background: transparent;
        border: 2px solid  ${design?.header_color};
    }
  `;

  // useEffect(() => {
  //   Purchase(parseInt(total + tax), "BDT");
  //   AddToCart();
  // }, [total, tax]);

  return (
    <div
      className={`${
        design?.template_id === "34"
          ? "bg-thirty-one border border-white"
          : "bg-gray-200 "
      } p-5 sm:rounded-md`}
    >
      <style>{styleCss}</style>
      {/* {error && <SnackBar open={true} msg={error} />} */}
      <h3 className="text-center font-semibold text-lg ">
        {design?.template_id === "29" || store_id === 3601 || store_id === 3904
          ? "আপনার অর্ডার সমূহ"
          : "Your Order Summary"}
      </h3>
      {store_id === 3020 && (
        <p className="mt-3 bg-black text-white px-2 py-1">
          অর্ডার টি কর্নফার্ম করতে ১৫০/- পেমেন্ট করুন
        </p>
      )}
      {cartList ? (
        <>
          <div className="my-16">
            <div className=" flex flex-col justify-between mt-16 pt-5">
              {/* Replace with your content */}
              <div className="px-2 h-2/3 overflow-y-auto">
                {cartList?.map((item: any, index: any) => (
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
          <h3 className="text-center font-semibold text-lg ">
            No Products Found
          </h3>
        </div>
      )}

      <div className="my-5 text-gray-500 px-2" style={{ fontWeight: 500 }}>
        <div className="flex justify-between items-center">
          <p>{design?.template_id === "29" ? "সাব টোটাল" : "Sub Total"}</p>
          <p>
            <BDT price={parseInt(total)} />
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p>{design?.template_id === "29" ? "ডিসকাউন্ট" : "Discount"}</p>
          <p>{<BDT price={couponDis} />}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>{design?.template_id === "29" ? "ট্যাক্স" : "Tax"}</p>
          <p>{<BDT price={parseInt(tax)} />}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>
            {design?.template_id === "29"
              ? "এস্টিমেটেড শিপিং"
              : "Estimated Shipping"}
          </p>
          {shipping_area === "--Select Area--" ? (
            <p>
              <BDT /> 0
            </p>
          ) : (
            <p>
              <BDT price={shipping_area ? shipping_area : 0} />
            </p>
          )}
        </div>
        <div className="h-[2px] w-full bg-gray-300 mt-4 mb-2"></div>
        <div className="flex justify-between items-center  font-semibold">
          <p>{design?.template_id === "29" ? "মোট" : "Total"}</p>
          {shipping_area === "--Select Area--" || shipping_area === null ? (
            <p>{<BDT price={parseInt(total + tax) - couponDis} />}</p>
          ) : (
            <p>
              {
                <BDT
                  price={
                    parseInt(total + tax) + parseInt(shipping_area) - couponDis
                  }
                />
              }
            </p>
          )}
        </div>
        <PaymentGateway
          selectPayment={selectPayment}
          setSelectPayment={setSelectPayment}
        />
      </div>

      {store_id === 3020 && (
        <div>
          <p className="px-2">
            <span className="my-1 font-bold">
              Bkash/Nagad/Upay/Rocket (
              <span className="text-sm">Advanced Personal</span>) -{" "}
            </span>{" "}
            01660003040
          </p>
        </div>
      )}

      {loading ? (
        <button
          className={`font-semibold tracking-wider my-1 rounded-full cart-btn border border-gray-300 w-full py-3 ${btnhover}`}
        >
          Loading
        </button>
      ) : (
        <button
          // disabled={userPhone?.length !== 11}
          className={`font-semibold tracking-wider my-1 rounded-full border cart-btn border-gray-300 w-full py-3   ${btnhover}`}
          onClick={() => handleCheckout()}
        >
          {design?.template_id === "29" ||
          store_id === 3601 ||
          store_id === 3904
            ? "অর্ডার কনফার্ম করুন"
            : "Place Order"}
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

export default YourOrders;

const Single = ({ item, setIsOpen, files, index }: any) => {
  const { module } = useTheme();

  const uploadFile = module?.find((item: any) => item?.modulus_id === 104);

  function openModal() {
    setIsOpen(true);
  }

  const dispatch = useDispatch();

  const file = files.some((i: any) => i.cartId === index);

  // const price = getPrice(item.regular_price, item.discount_price, item.discount_type)

  return (
    <div
      key={item.id}
      className="flex flex-col sm:flex-row justify-start sm:justify-between space-y-2 space-x-1 sm:items-center border-b-2 border-gray-300 py-2 "
    >
      <div className="flex items-center gap-2">
        <div className="w-14 relative">
          <img className="w-14 h-14" src={productImg + item.image[0]} alt="" />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-500 text-white text-xs rounded-full flex justify-center items-center">
            <p>{item?.qty}</p>
          </div>
        </div>
        <div className="flex flex-col gap-x-2 gap-y-1 pl-2 justify-start">
          <h3 className=" text-md  font-normal">
            <Link href={"/product/" + item?.id + "/" + item?.slug}>
              {item?.name.slice(0, 15)}
              {item?.name?.length > 15 && "..."}
            </Link>
          </h3>
          {/* <p className='text-sm'>&#2547; {parseInt(item?.price)} * {item?.qty} </p> */}
          <div className="flex items-center mt-1">
            {item?.color ? (
              <div className="flex items-center gap-2 pr-2">
                <p className="font-semibold text-sm">Color: </p>
                <p
                  style={{ backgroundColor: item?.color }}
                  className="w-4 h-4 rounded-full ring-1 ring-offset-2 ring-gray-600"
                ></p>
              </div>
            ) : null}
            {item?.size ? (
              <p className="font-semibold text-sm">
                Size: <span className="font-normal text-sm">{item?.size}</span>
              </p>
            ) : null}
            {item?.unit ? (
              <p className="font-semibold text-sm">
                Unit:{" "}
                <span className="font-normal text-sm">
                  {item?.volume + " " + item?.unit}
                </span>
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-x-5 justify-end">
        <div className="text-md font-semibold">
          <BDT price={item?.price * item?.qty} />
        </div>
        <div className="">
          <MdDelete
            onClick={() => dispatch(removeToCartList(item.cartId))}
            className="text-2xl lg:cursor-pointer"
          />
        </div>
        {uploadFile?.status === "1" && (
          <button
            onClick={() => openModal()}
            className="px-4 py-1 bg-green-500 rounded-md"
          >
            {file ? "Edit" : "Upload"}
          </button>
        )}
      </div>
    </div>
  );
};
